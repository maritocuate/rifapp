import { router } from './trpc'
import { rafflesRouter } from './routers/raffles'
import { winnersRouter } from './routers/winners'

// Router principal que combina todos los routers
export const appRouter = router({
  raffles: rafflesRouter,
  winners: winnersRouter,
})

// Exportar el tipo del router para el cliente
export type AppRouter = typeof appRouter
