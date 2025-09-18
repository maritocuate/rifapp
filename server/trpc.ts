import { initTRPC } from '@trpc/server'
import { createTRPCSupabaseClient } from '@/lib/supabase-trpc'

// Crear contexto para tRPC
export const createTRPCContext = async () => {
  const supabase = createTRPCSupabaseClient()
  
  return {
    supabase,
  }
}

// Inicializar tRPC
const t = initTRPC.context<typeof createTRPCContext>().create()

// Exportar procedimientos reutilizables
export const router = t.router
export const publicProcedure = t.procedure
