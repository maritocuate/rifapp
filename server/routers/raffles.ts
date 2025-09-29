import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const rafflesRouter = router({
  // Obtener todas las rifas
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data: raffles, error } = await ctx.supabase
      .from('raffles')
      .select(`
        *,
        profiles:author_id (
          username
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener rifas: ${error.message}`)
    }

    // Obtener estadísticas reales de tickets vendidos para todas las rifas
    const rafflesWithStats = await Promise.all(
      raffles?.map(async (raffle) => {
        const { data: tickets, error: ticketsError } = await ctx.supabase
          .from('tickets')
          .select('is_sold')
          .eq('raffle_id', raffle.id)

        if (ticketsError) {
          console.error(`Error obteniendo tickets para rifa ${raffle.id}:`, ticketsError)
          return {
            ...raffle,
            totalNumbers: 100,
            soldNumbers: 0,
          }
        }

        const soldNumbers = tickets?.filter(ticket => ticket.is_sold).length || 0

        return {
          ...raffle,
          totalNumbers: 100,
          soldNumbers,
        }
      }) || []
    )

    return rafflesWithStats
  }),

  // Obtener rifas activas
  getActive: publicProcedure.query(async ({ ctx }) => {
    const { data: raffles, error } = await ctx.supabase
      .from('raffles')
      .select(`
        *,
        profiles:author_id (
          username
        )
      `)
      .eq('status', 'activo')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener rifas activas: ${error.message}`)
    }

    return raffles
  }),

  // Obtener rifas por finalizar (activas con pocos números disponibles)
  getAlmostFinished: publicProcedure.query(async ({ ctx }) => {
    const { data: raffles, error } = await ctx.supabase
      .from('raffles')
      .select(`
        *,
        profiles:author_id (
          username
        )
      `)
      .eq('status', 'activo')
      .order('created_at', { ascending: false })
      .limit(7) // Limitar a 7 rifas para mostrar

    if (error) {
      throw new Error(`Error al obtener rifas por finalizar: ${error.message}`)
    }

    // Obtener estadísticas reales de tickets vendidos
    const rafflesWithStats = await Promise.all(
      raffles?.map(async (raffle) => {
        const { data: tickets, error: ticketsError } = await ctx.supabase
          .from('tickets')
          .select('is_sold')
          .eq('raffle_id', raffle.id)

        if (ticketsError) {
          console.error(`Error obteniendo tickets para rifa ${raffle.id}:`, ticketsError)
          return {
            ...raffle,
            totalNumbers: 100,
            soldNumbers: 0,
          }
        }

        const soldNumbers = tickets?.filter(ticket => ticket.is_sold).length || 0

        return {
          ...raffle,
          totalNumbers: 100,
          soldNumbers,
        }
      }) || []
    )

    // Ordenar por número de tickets vendidos (descendente) para mostrar las más cerca de finalizar primero
    const sortedRaffles = rafflesWithStats.sort((a, b) => {
      // Primero por número de tickets vendidos (descendente)
      if (b.soldNumbers !== a.soldNumbers) {
        return b.soldNumbers - a.soldNumbers
      }
      // Si tienen el mismo número de tickets vendidos, ordenar por fecha de creación (descendente)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    return sortedRaffles
  }),

  // Obtener una rifa por ID
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: raffle, error } = await ctx.supabase
        .from('raffles')
        .select(`
          *,
          profiles:author_id (
            username
          )
        `)
        .eq('id', input.id)
        .single()

      if (error) {
        throw new Error(`Error al obtener rifa: ${error.message}`)
      }

      return raffle
    }),

  // Obtener una rifa por alias
  getByAlias: publicProcedure
    .input(z.object({ alias: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data: raffle, error } = await ctx.supabase
        .from('raffles')
        .select(`
          *,
          profiles:author_id (
            username
          )
        `)
        .eq('alias', input.alias)
        .single()

      if (error) {
        throw new Error(`Error al obtener rifa: ${error.message}`)
      }

      return raffle
    }),

  // Obtener estadísticas de tickets de una rifa
  getTicketStats: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: tickets, error } = await ctx.supabase
        .from('tickets')
        .select('is_sold')
        .eq('raffle_id', input.raffleId)

      if (error) {
        throw new Error(`Error al obtener estadísticas de tickets: ${error.message}`)
      }

      const soldNumbers = tickets?.filter(ticket => ticket.is_sold).length || 0
      const totalNumbers = 100 // Asumiendo que todas las rifas tienen 100 números

      return {
        totalNumbers,
        soldNumbers,
        availableNumbers: totalNumbers - soldNumbers,
        soldPercentage: Math.round((soldNumbers / totalNumbers) * 100),
      }
    }),

  // Obtener números vendidos específicos de una rifa
  getSoldNumbers: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: tickets, error } = await ctx.supabase
        .from('tickets')
        .select('number, is_sold')
        .eq('raffle_id', input.raffleId)
        .eq('is_sold', true)

      if (error) {
        throw new Error(`Error al obtener números vendidos: ${error.message}`)
      }

      // Extraer solo los números vendidos
      const soldNumbers = tickets?.map(ticket => ticket.number) || []
      
      return soldNumbers
    }),

  // Obtener números comprados por el usuario actual en una rifa específica
  getUserNumbers: publicProcedure
    .input(z.object({ raffleId: z.string().uuid(), userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: tickets, error } = await ctx.supabase
        .from('tickets')
        .select('number')
        .eq('raffle_id', input.raffleId)
        .eq('buyer_id', input.userId)
        .eq('is_sold', true)

      if (error) {
        throw new Error(`Error al obtener números del usuario: ${error.message}`)
      }

      // Extraer solo los números comprados por el usuario
      const userNumbers = tickets?.map(ticket => ticket.number) || []
      
      return userNumbers
    }),

  // Obtener el número de rifas creadas por un usuario
  getUserRaffleCount: publicProcedure
    .input(z.object({ author_id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { count, error } = await ctx.supabase
        .from('raffles')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', input.author_id)

      if (error) {
        throw new Error(`Error al contar rifas del usuario: ${error.message}`)
      }

      return count || 0
    }),

  // Obtener rifas creadas por un usuario
  getUserRaffles: publicProcedure
    .input(z.object({ author_id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: raffles, error } = await ctx.supabase
        .from('raffles')
        .select(`
          *,
          profiles:author_id (
            username
          )
        `)
        .eq('author_id', input.author_id)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error al obtener rifas del usuario: ${error.message}`)
      }

      return raffles || []
    }),

  // Obtener números comprados por un usuario en todas las rifas
  getUserPurchasedNumbers: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data: tickets, error } = await ctx.supabase
        .from('tickets')
        .select(`
          number,
          raffle_id,
          raffles (
            id,
            title,
            alias,
            number_cost,
            status
          )
        `)
        .eq('buyer_id', input.userId)
        .eq('is_sold', true)

      if (error) {
        throw new Error(`Error al obtener números comprados: ${error.message}`)
      }

      // Agrupar por rifa
      const groupedByRaffle = tickets?.reduce((acc, ticket) => {
        const raffleId = ticket.raffle_id
        if (!acc[raffleId]) {
          acc[raffleId] = {
            raffle: ticket.raffles,
            numbers: []
          }
        }
        acc[raffleId].numbers.push(ticket.number)
        return acc
      }, {} as Record<string, { raffle: any, numbers: string[] }>)

      return Object.values(groupedByRaffle || {})
    }),

  // Crear una nueva rifa
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1, 'El título es requerido'),
      description: z.string().optional(),
      prize_description: z.string().optional(),
      prize_image_url: z.string().url().optional(),
      number_cost: z.number().min(1, 'El costo por número debe ser mayor a 0'),
      author_id: z.string().uuid(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verificar el límite de rifas por usuario (máximo 3)
      const { count, error: countError } = await ctx.supabase
        .from('raffles')
        .select('*', { count: 'exact', head: true })
        .eq('author_id', input.author_id)

      if (countError) {
        throw new Error(`Error al verificar límite de rifas: ${countError.message}`)
      }

      if (count && count >= 3) {
        throw new Error('Has alcanzado el límite máximo de 3 rifas por usuario')
      }

      // Generar alias basado en el título
      const generateAlias = (title: string): string => {
        return title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remover acentos
          .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
          .replace(/\s+/g, '-') // Reemplazar espacios con guiones
          .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
          .replace(/^-|-$/g, '') // Remover guiones al inicio y final
      }

      let baseAlias = generateAlias(input.title)
      let alias = baseAlias
      let counter = 1

      // Verificar que el alias sea único
      while (true) {
        const { data: existingRaffle } = await ctx.supabase
          .from('raffles')
          .select('id')
          .eq('alias', alias)
          .single()

        if (!existingRaffle) {
          break // El alias está disponible
        }

        alias = `${baseAlias}-${counter}`
        counter++
      }

      const { data: raffle, error } = await ctx.supabase
        .from('raffles')
        .insert({
          ...input,
          alias,
          status: 'activo', // Establecer como activa por defecto
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Error al crear rifa: ${error.message}`)
      }

      // Crear los 100 tickets para la rifa
      const tickets = Array.from({ length: 100 }, (_, index) => ({
        raffle_id: raffle.id,
        number: index.toString().padStart(2, '0'),
        is_sold: false,
      }))

      const { error: ticketsError } = await ctx.supabase
        .from('tickets')
        .insert(tickets)

      if (ticketsError) {
        console.error('Error creando tickets:', ticketsError)
        // No lanzamos error aquí para no fallar la creación de la rifa
      }

      return raffle
    }),

  // Comprar números de una rifa
  purchaseNumbers: publicProcedure
    .input(z.object({
      raffleId: z.string().uuid(),
      numbers: z.array(z.number().min(1).max(100)),
      buyerId: z.string().uuid(),
      buyerEmail: z.string().email(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verificar que los números estén disponibles
      const { data: tickets, error: ticketsError } = await ctx.supabase
        .from('tickets')
        .select('number, is_sold')
        .eq('raffle_id', input.raffleId)
        .in('number', input.numbers.map(n => n.toString()))

      if (ticketsError) {
        throw new Error(`Error al verificar disponibilidad: ${ticketsError.message}`)
      }

      const soldNumbers = tickets?.filter(t => t.is_sold).map(t => t.number) || []
      if (soldNumbers.length > 0) {
        throw new Error(`Los números ${soldNumbers.join(', ')} ya están vendidos`)
      }

      // Obtener el costo por número de la rifa
      const { data: raffle, error: raffleError } = await ctx.supabase
        .from('raffles')
        .select('number_cost')
        .eq('id', input.raffleId)
        .single()

      if (raffleError || !raffle) {
        throw new Error('Rifa no encontrada')
      }

      const totalAmount = input.numbers.length * raffle.number_cost

      // Crear preferencia de MercadoPago
      try {
        const { MercadoPagoConfig, Preference } = await import('mercadopago')
        
        const client = new MercadoPagoConfig({
          accessToken: process.env.MERCADOLIBRE_TOKEN || '',
        })

        const preference = new Preference(client)
        
        const result = await preference.create({
          body: {
            items: [
              {
                id: input.raffleId,
                title: `Riffita - Números de Rifa`,
                currency_id: 'ARS',
                picture_url: '/favicon.ico',
                description: `Números: ${input.numbers.join(', ')}`,
                category_id: 'tickets',
                quantity: 1,
                unit_price: totalAmount,
              },
            ],
            payer: {
              email: input.buyerEmail,
            },
            back_urls: {
              success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/callback?status=success&raffleId=${input.raffleId}&numbers=${input.numbers.join(',')}`,
              failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/callback?status=failure&raffleId=${input.raffleId}`,
              pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/callback?status=pending&raffleId=${input.raffleId}`,
            },
            auto_return: 'approved',
            payment_methods: {
              excluded_payment_methods: [
                { id: 'argencard' },
                { id: 'cabal' },
                { id: 'cmr' },
              ],
              excluded_payment_types: [
                { id: 'ticket' },
              ],
              installments: 1,
            },
            notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/tickets/webhook`,
            statement_descriptor: 'RIFFITA',
            external_reference: `${input.raffleId}-${input.numbers.join(',')}-${input.buyerId}`,
            expires: true,
            expiration_date_from: new Date().toISOString(),
            expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          },
        })

        return result
      } catch (error) {
        console.error('Error creating MercadoPago preference:', error)
        throw new Error(`Error al crear preferencia de pago: ${error instanceof Error ? error.message : 'Error desconocido'}`)
      }
    }),

})
