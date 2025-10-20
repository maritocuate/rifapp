'use client'

import { useState } from 'react'
import { trpc } from '@/client/trpc'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import {  
  WarningIcon, 
  UserPlusIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@phosphor-icons/react'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    isAdmin: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const createUserMutation = trpc.admin.createAdminUser.useMutation({
    onSuccess: () => {
      setSuccess(true)
      setIsSubmitting(false)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({ email: '', password: '', username: '', isAdmin: false })
        setError('')
      }, 2000)
    },
    onError: (error) => {
      setError(error.message)
      setIsSubmitting(false)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await createUserMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        username: formData.username
      })
    } catch (error) {
      // Error ya manejado en onError
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setFormData({ email: '', password: '', username: '', isAdmin: false })
      setError('')
      setSuccess(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlusIcon className="h-5 w-5" />
            Crear Nuevo Usuario
          </DialogTitle>
          <DialogDescription>
            Crea un nuevo usuario en el sistema. Los administradores tienen acceso completo al panel.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircleIcon className="h-16 w-16 text-green-600" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800">Usuario Creado</h3>
              <p className="text-sm text-gray-600">
                El usuario ha sido creado exitosamente
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <WarningIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="usuario@ejemplo.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="nombre_usuario"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Mínimo 6 caracteres
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmin"
                checked={formData.isAdmin}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isAdmin: checked as boolean }))
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="isAdmin" className="text-sm">
                Dar permisos de administrador
              </Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creando...
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="h-4 w-4" />
                    Crear Usuario
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
