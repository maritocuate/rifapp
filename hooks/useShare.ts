import { useState, useCallback } from 'react'

interface ShareData {
  title: string
  text?: string
  url: string
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const share = useCallback(async (data: ShareData) => {
    if (!navigator.share) {
      throw new Error('Web Share API no está disponible en este navegador')
    }

    setIsSharing(true)
    setError(null)

    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al compartir'
      setError(errorMessage)
      throw err
    } finally {
      setIsSharing(false)
    }
  }, [])

  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  return {
    share,
    isSharing,
    error,
    canShare
  }
}
