import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const winnersRouter = router({
  // Seleccionar ganador para una rifa
  selectWinner: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .rpc('select_raffle_winner', { raffle_uuid: input.raffleId })

      if (error) {
        throw new Error(`Error al seleccionar ganador: ${error.message}`)
      }

      return data?.[0] || null
    }),

  // Obtener ganadores de una rifa
  getRaffleWinners: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .rpc('get_raffle_winners', { raffle_uuid: input.raffleId })

      if (error) {
        throw new Error(`Error al obtener ganadores: ${error.message}`)
      }

      return data || []
    }),

  // Obtener información completa de ganadores
  getWinnersInfo: publicProcedure
    .query(async ({ ctx }) => {
      const { data, error } = await ctx.supabase
        .from('winners_info')
        .select('*')
        .order('won_at', { ascending: false })

      if (error) {
        throw new Error(`Error al obtener información de ganadores: ${error.message}`)
      }

      return data || []
    }),

  // Obtener ganadores de un usuario específico
  getUserWins: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('winners_info')
        .select('*')
        .eq('winner_id', input.userId)
        .order('won_at', { ascending: false })

      if (error) {
        throw new Error(`Error al obtener ganancias del usuario: ${error.message}`)
      }

      return data || []
    }),

  // Marcar premio como reclamado
  claimPrize: publicProcedure
    .input(z.object({ 
      raffleId: z.string().uuid(), 
      winnerId: z.string().uuid() 
    }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .rpc('claim_prize', { 
          raffle_uuid: input.raffleId, 
          winner_uuid: input.winnerId 
        })

      if (error) {
        throw new Error(`Error al reclamar premio: ${error.message}`)
      }

      return data
    }),

  // Verificar si una rifa ya tiene ganador
  checkRaffleWinner: publicProcedure
    .input(z.object({ raffleId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('winners')
        .select('id')
        .eq('raffle_id', input.raffleId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw new Error(`Error al verificar ganador: ${error.message}`)
      }

      return !!data
    }),

  // Obtener estadísticas de ganadores
  getWinnersStats: publicProcedure
    .query(async ({ ctx }) => {
      const { data, error } = await ctx.supabase
        .from('winners_info')
        .select('*')

      if (error) {
        throw new Error(`Error al obtener estadísticas: ${error.message}`)
      }

      if (!data) return null

      const totalWinners = data.length
      const claimedPrizes = data.filter(w => w.is_claimed).length
      const pendingPrizes = totalWinners - claimedPrizes
      const totalPrizeValue = data.reduce((sum, w) => sum + (w.prize_value || 0), 0)

      // Estadísticas por usuario
      const userStats = data.reduce((acc, winner) => {
        const userId = winner.winner_id
        if (!acc[userId]) {
          acc[userId] = {
            username: winner.winner_username,
            totalWins: 0,
            claimedWins: 0,
            totalValue: 0
          }
        }
        acc[userId].totalWins++
        if (winner.is_claimed) acc[userId].claimedWins++
        acc[userId].totalValue += winner.prize_value || 0
        return acc
      }, {} as Record<string, any>)

      const topWinner = Object.values(userStats).sort((a: any, b: any) => b.totalWins - a.totalWins)[0]

      return {
        totalWinners,
        claimedPrizes,
        pendingPrizes,
        totalPrizeValue,
        claimRate: totalWinners > 0 ? Math.round((claimedPrizes / totalWinners) * 100) : 0,
        topWinner
      }
    }),

  // Obtener ganadores recientes
  getRecentWinners: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('winners_info')
        .select('*')
        .order('won_at', { ascending: false })
        .limit(input.limit)

      if (error) {
        throw new Error(`Error al obtener ganadores recientes: ${error.message}`)
      }

      return data || []
    })
})
