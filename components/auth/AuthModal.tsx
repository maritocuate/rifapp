'use client'

import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
  redirectTo?: string
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login', redirectTo }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-none">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </DialogTitle>
        </DialogHeader>
        {mode === 'login' ? (
          <LoginForm onToggleMode={toggleMode} redirectTo={redirectTo} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} />
        )}
      </DialogContent>
    </Dialog>
  )
}
