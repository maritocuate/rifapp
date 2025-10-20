'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, CheckCircle, Warning } from '@phosphor-icons/react'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function SetupAdminPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/setup-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
        setTimeout(() => {
          window.location.href = '/admin'
        }, 2000)
      } else {
        setResult({ success: false, message: data.error })
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Error de conexión. Intenta de nuevo.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Configurar Administrador</CardTitle>
          <CardDescription>
            Configura el primer usuario administrador para acceder al panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email del usuario</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-email@ejemplo.com"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Debe ser un email de un usuario ya registrado
              </p>
            </div>

            {result && (
              <Alert variant={result.success ? "default" : "destructive"}>
                {result.success ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Warning className="h-4 w-4" />
                )}
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Configurando...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Configurar como Administrador
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Instrucciones:</h4>
            <ol className="text-sm text-yellow-700 space-y-1">
              <li>1. Asegúrate de estar registrado en la aplicación</li>
              <li>2. Ingresa tu email exacto</li>
              <li>3. Haz clic en "Configurar como Administrador"</li>
              <li>4. Serás redirigido al panel de administración</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


