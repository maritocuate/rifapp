'use client'

import { WarningCircle, ArrowClockwise } from '@phosphor-icons/react'

interface ErrorStateProps {
  onRetry?: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <WarningCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-400 font-mono mb-2">
          Error al cargar el perfil
        </h2>
        <p className="text-gray-400 mb-6">
          No pudimos cargar la información de tu perfil. Por favor, intenta nuevamente.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/30 transition-colors font-mono"
          >
            <ArrowClockwise className="h-4 w-4 mr-2" />
            Reintentar
          </button>
        )}
      </div>
    </div>
  )
}
