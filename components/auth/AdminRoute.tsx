'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Shield, Warning, ArrowLeft } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

interface AdminRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AdminRoute({ children, fallback }: AdminRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false)
        setIsChecking(false)
        return
      }

      try {
        // Verificar si el usuario es administrador
        const response = await fetch('/api/admin/check-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        })

        if (response.ok) {
          const data = await response.json()
          setIsAdmin(data.isAdmin)
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
      } finally {
        setIsChecking(false)
      }
    }

    if (!loading) {
      checkAdminStatus()
    }
  }, [user, loading])

  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="Verificando permisos..." size="lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md">
          <Shield className="h-16 w-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Acceso Denegado</h1>
          <p className="text-gray-600">
            Necesitas iniciar sesión para acceder al panel de administración
          </p>
          <Button onClick={() => router.push('/')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Button>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md">
          <Shield className="h-16 w-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Acceso Restringido</h1>
          <p className="text-gray-600">
            Solo los administradores pueden acceder a esta sección
          </p>
          <Alert variant="destructive">
            <Warning className="h-4 w-4" />
            <AlertDescription>
              Tu cuenta no tiene permisos de administrador
            </AlertDescription>
          </Alert>
          <Button onClick={() => router.push('/')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
