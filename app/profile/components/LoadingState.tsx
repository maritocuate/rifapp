'use client'

import { Spinner } from '@phosphor-icons/react'

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner className="h-8 w-8 animate-spin text-yellow-400 mx-auto mb-4" />
        <div className="text-yellow-400 font-mono">Cargando perfil...</div>
      </div>
    </div>
  )
}
