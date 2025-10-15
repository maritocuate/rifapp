'use client'

import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from './AuthModal'
import { useState, useEffect } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true)
    }
  }, [user, loading])

  if (loading) {
    return <LoadingSpinner message="Cargando..." size="md" fullScreen />
  }

  if (!user) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">Acceso Requerido</h1>
              <p className="text-muted-foreground">
                Necesitas iniciar sesión para acceder a esta página
              </p>
            </div>
          </div>
        )}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
        />
      </>
    )
  }

  return <>{children}</>
}
