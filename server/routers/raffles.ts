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

    return raffles || []
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

    return rafflesWithStats
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

      const { data: raffle, error } = await ctx.supabase
        .from('raffles')
        .insert({
          ...input,
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
})
