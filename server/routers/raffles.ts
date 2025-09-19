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

  // Crear una nueva rifa
  create: publicProcedure
    .input(z.object({
      title: z.string().min(1, 'El título es requerido'),
      description: z.string().optional(),
      prize_description: z.string().optional(),
      prize_image_url: z.string().url().optional(),
      author_id: z.string().uuid(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { data: raffle, error } = await ctx.supabase
        .from('raffles')
        .insert(input)
        .select()
        .single()

      if (error) {
        throw new Error(`Error al crear rifa: ${error.message}`)
      }

      return raffle
    }),
})
