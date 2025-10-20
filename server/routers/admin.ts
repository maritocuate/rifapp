import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const adminRouter = router({
  getSystemStats: publicProcedure.query(async ({ ctx }) => {
    const { data: raffles, error: rafflesError } = await ctx.supabase
      .from('raffles')
      .select('id, status, number_cost')

    if (rafflesError) {
      throw new Error(`Error al obtener estadísticas de rifas: ${rafflesError.message}`)
    }

    const { data: users, error: usersError } = await ctx.supabase
      .from('profiles')
      .select('id, created_at')

    if (usersError) {
      throw new Error(`Error al obtener estadísticas de usuarios: ${usersError.message}`)
    }

    const { data: tickets, error: ticketsError } = await ctx.supabase
      .from('tickets')
      .select('is_sold')

    if (ticketsError) {
      throw new Error(`Error al obtener estadísticas de tickets: ${ticketsError.message}`)
    }
    const { data: winners, error: winnersError } = await ctx.supabase
      .from('winners')
      .select('is_claimed, prize_value, won_at')

    if (winnersError) {
      throw new Error(`Error al obtener estadísticas de ganadores: ${winnersError.message}`)
    }

    const totalRaffles = raffles?.length || 0
    const activeRaffles = raffles?.filter(r => r.status === 'activo').length || 0
    const finishedRaffles = raffles?.filter(r => r.status === 'finalizado').length || 0
    const totalUsers = users?.length || 0
    const totalTicketsSold = tickets?.filter(t => t.is_sold).length || 0
    const totalRevenue = raffles?.reduce((sum, r) => sum + (r.number_cost * 100), 0) || 0
    const totalWinners = winners?.length || 0
    const claimedPrizes = winners?.filter(w => w.is_claimed).length || 0
    const totalPrizeValue = winners?.reduce((sum, w) => sum + (w.prize_value || 0), 0) || 0

    return {
      raffles: {
        total: totalRaffles,
        active: activeRaffles,
        finished: finishedRaffles
      },
      users: {
        total: totalUsers
      },
      tickets: {
        totalSold: totalTicketsSold
      },
      revenue: {
        total: totalRevenue
      },
      winners: {
        total: totalWinners,
        claimed: claimedPrizes,
        pending: totalWinners - claimedPrizes,
        totalPrizeValue
      }
    }
  }),

  getAllRaffles: publicProcedure.query(async ({ ctx }) => {
    const { data: raffles, error } = await ctx.supabase
      .from('raffles')
      .select(`
        *,
        profiles:author_id (
          username,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener rifas: ${error.message}`)
    }

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
            revenue: 0
          }
        }

        const soldNumbers = tickets?.filter(t => t.is_sold).length || 0
        const revenue = soldNumbers * raffle.number_cost

        return {
          ...raffle,
          totalNumbers: 100,
          soldNumbers,
          revenue
        }
      }) || []
    )

    return rafflesWithStats
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const { data: users, error } = await ctx.supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`)
    }

    return users || []
  }),

  getAllTickets: publicProcedure.query(async ({ ctx }) => {
    const { data: tickets, error } = await ctx.supabase
      .from('tickets')
      .select(`
        *,
        raffles (
          id,
          title,
          alias,
          status
        ),
        profiles:buyer_id (
          username,
          email
        )
      `)
      .order('id', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener tickets: ${error.message}`)
    }

    return tickets || []
  }),

  getAllWinners: publicProcedure.query(async ({ ctx }) => {
    const { data: winners, error } = await ctx.supabase
      .from('winners')
      .select(`
        *,
        raffles (
          id,
          title,
          alias
        ),
        profiles:winner_id (
          username,
          email
        )
      `)
      .order('won_at', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener ganadores: ${error.message}`)
    }

    return winners || []
  }),

  finishRaffle: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('raffles')
        .update({ status: 'finalizado' })
        .eq('id', input.raffleId)
        .select()

      if (error) {
        throw new Error(`Error al finalizar rifa: ${error.message}`)
      }

      return data?.[0]
    }),

  createAdminUser: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      username: z.string().min(3)
    }))
    .mutation(async ({ ctx, input }) => {
      const { data: authData, error: authError } = await ctx.supabase.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: true
      })

      if (authError) {
        throw new Error(`Error al crear usuario: ${authError.message}`)
      }

      const { data: profileData, error: profileError } = await ctx.supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: input.username,
          email: input.email,
          is_admin: true
        })
        .select()

      if (profileError) {
        throw new Error(`Error al crear perfil: ${profileError.message}`)
      }

      return profileData?.[0]
    }),

  getRafflesAlmostFinished: publicProcedure.query(async ({ ctx }) => {
    const { data: raffles, error } = await ctx.supabase
      .from('raffles')
      .select(`
        *,
        profiles:author_id (
          username,
          email
        )
      `)
      .eq('status', 'activo')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error al obtener rifas: ${error.message}`)
    }

    const rafflesWithStats = await Promise.all(
      raffles?.map(async (raffle) => {
        const { data: tickets, error: ticketsError } = await ctx.supabase
          .from('tickets')
          .select('is_sold')
          .eq('raffle_id', raffle.id)
          .eq('is_sold', true)

        if (ticketsError) {
          console.error(`Error obteniendo tickets para rifa ${raffle.id}:`, ticketsError)
          return null
        }

        const soldNumbers = tickets?.length || 0
        const availableNumbers = 100 - soldNumbers

        return {
          ...raffle,
          totalNumbers: 100,
          soldNumbers,
          availableNumbers
        }
      }) || []
    )

    return rafflesWithStats.filter(raffle => raffle && raffle.availableNumbers <= 20)
  }),

  getRecentUsers: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    .query(async ({ ctx, input }) => {
      const { data: users, error } = await ctx.supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(input.limit)

      if (error) {
        throw new Error(`Error al obtener usuarios recientes: ${error.message}`)
      }

      return users || []
    }),

  getRecentTickets: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(10) }))
    .query(async ({ ctx, input }) => {
      const { data: tickets, error } = await ctx.supabase
        .from('tickets')
        .select(`
          *,
          raffles (
            id,
            title,
            alias
          ),
          profiles:buyer_id (
            username
          )
        `)
        .eq('is_sold', true)
        .order('id', { ascending: false })
        .limit(input.limit)

      if (error) {
        throw new Error(`Error al obtener tickets recientes: ${error.message}`)
      }

      return tickets || []
    }),

  deleteRaffle: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { data: tickets, error: ticketsError } = await ctx.supabase
        .from('tickets')
        .select('id')
        .eq('raffle_id', input.raffleId)
        .eq('is_sold', true)
        .limit(1)

      if (ticketsError) {
        throw new Error(`Error al verificar tickets: ${ticketsError.message}`)
      }

      if (tickets && tickets.length > 0) {
        throw new Error('No se puede eliminar una rifa que tiene tickets vendidos')
      }

      const { data, error } = await ctx.supabase
        .from('raffles')
        .delete()
        .eq('id', input.raffleId)
        .select()

      if (error) {
        throw new Error(`Error al eliminar rifa: ${error.message}`)
      }

      return data?.[0]
    }),

  getSalesStats: publicProcedure
    .input(z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional()
    }))
    .query(async ({ ctx, input }) => {
      let query = ctx.supabase
        .from('tickets')
        .select(`
          id,
          raffles (
            number_cost
          )
        `)
        .eq('is_sold', true)

      if (input.startDate) {
        query = query.gte('id', 1) // Usar ID como proxy temporal
      }
      if (input.endDate) {
        query = query.lte('id', 999999) // Usar ID como proxy temporal
      }

      const { data: tickets, error } = await query

      if (error) {
        throw new Error(`Error al obtener estadísticas de ventas: ${error.message}`)
      }

      const totalTickets = tickets?.length || 0
      const totalRevenue = tickets?.reduce((sum, ticket) => {
        const raffle = Array.isArray(ticket.raffles) ? ticket.raffles[0] : ticket.raffles
        return sum + (raffle?.number_cost || 0)
      }, 0) || 0

      return {
        totalTickets,
        totalRevenue,
        averageTicketPrice: totalTickets > 0 ? totalRevenue / totalTickets : 0
      }
    }),

  generateTickets: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { data: raffle, error: raffleError } = await ctx.supabase
        .from('raffles')
        .select('id, status')
        .eq('id', input.raffleId)
        .single()

      if (raffleError) {
        throw new Error(`Error al verificar rifa: ${raffleError.message}`)
      }

      if (!raffle) {
        throw new Error('Rifa no encontrada')
      }

      if (raffle.status !== 'activo') {
        throw new Error('Solo se pueden generar tickets para rifas activas')
      }

      const { data: existingTickets, error: existingError } = await ctx.supabase
        .from('tickets')
        .select('id')
        .eq('raffle_id', input.raffleId)
        .limit(1)

      if (existingError) {
        throw new Error(`Error al verificar tickets existentes: ${existingError.message}`)
      }

      if (existingTickets && existingTickets.length > 0) {
        throw new Error('Esta rifa ya tiene tickets generados')
      }

      const tickets = Array.from({ length: 100 }, (_, i) => ({
        raffle_id: input.raffleId,
        number: i + 1,
        is_sold: false,
        buyer_id: null
      }))

      const { data, error } = await ctx.supabase
        .from('tickets')
        .insert(tickets)
        .select()

      if (error) {
        throw new Error(`Error al generar tickets: ${error.message}`)
      }

      return {
        success: true,
        ticketsGenerated: data.length,
        raffleId: input.raffleId
      }
    }),

  generateCustomTickets: publicProcedure
    .input(z.object({ 
      raffleId: z.string().uuid(),
      userId: z.string().uuid(),
      numbers: z.array(z.number().min(1).max(100))
    }))
    .mutation(async ({ ctx, input }) => {
      const { data: raffle, error: raffleError } = await ctx.supabase
        .from('raffles')
        .select('id, status')
        .eq('id', input.raffleId)
        .single()

      if (raffleError) {
        throw new Error(`Error al verificar rifa: ${raffleError.message}`)
      }

      if (!raffle) {
        throw new Error('Rifa no encontrada')
      }

      if (raffle.status !== 'activo') {
        throw new Error('Solo se pueden generar tickets para rifas activas')
      }

      const { data: user, error: userError } = await ctx.supabase
        .from('profiles')
        .select('id')
        .eq('id', input.userId)
        .single()

      if (userError) {
        throw new Error(`Error al verificar usuario: ${userError.message}`)
      }

      if (!user) {
        throw new Error('Usuario no encontrado')
      }

      const { data: existingTickets, error: existingError } = await ctx.supabase
        .from('tickets')
        .select('number')
        .eq('raffle_id', input.raffleId)
        .in('number', input.numbers)

      if (existingError) {
        throw new Error(`Error al verificar tickets existentes: ${existingError.message}`)
      }

      if (existingTickets && existingTickets.length > 0) {
        const existingNumbers = existingTickets.map(t => t.number).join(', ')
        throw new Error(`Los números ${existingNumbers} ya existen para esta rifa`)
      }

      const tickets = input.numbers.map(number => ({
        raffle_id: input.raffleId,
        number: number,
        is_sold: true, // Se marcan como vendidos porque se asignan a un usuario
        buyer_id: input.userId
      }))

      const { data, error } = await ctx.supabase
        .from('tickets')
        .insert(tickets)
        .select()

      if (error) {
        throw new Error(`Error al generar tickets: ${error.message}`)
      }

      return {
        success: true,
        ticketsGenerated: data.length,
        raffleId: input.raffleId,
        userId: input.userId,
        numbers: input.numbers
      }
    })
})
