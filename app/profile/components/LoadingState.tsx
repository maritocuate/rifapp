'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'

export function LoadingState() {
  return (
    <LoadingSpinner 
      message="Cargando perfil..." 
      size="md" 
      fullScreen 
    />
  )
}
