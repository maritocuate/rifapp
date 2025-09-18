import { router } from './trpc'
import { rafflesRouter } from './routers/raffles'

// Router principal que combina todos los routers
export const appRouter = router({
  raffles: rafflesRouter,
})

// Exportar el tipo del router para el cliente
export type AppRouter = typeof appRouter
