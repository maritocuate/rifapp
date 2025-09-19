'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '2rem',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  borderRadius: '20px',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  backdropFilter: 'blur(10px)',
}))

const FormTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: '2rem',
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 30%, #ffd700 60%, #b8860b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '1rem',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)',
}))

const SuccessTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: '2rem',
  color: '#10b981',
  textAlign: 'center',
  marginBottom: '0.5rem',
  textShadow: '0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.6)',
}))

const FormDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

const StyledLabel = styled(Label)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: '#ffd700',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
  fontWeight: 600,
}))

const StyledInput = styled(Input)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  padding: '0.75rem 1rem',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  
  '&:focus': {
    border: '1px solid rgba(255, 215, 0, 0.6)',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
    outline: 'none',
  },
  
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 600,
  fontSize: '1.1rem',
  padding: '0.75rem 2rem',
  borderRadius: '15px',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  color: '#1a0033',
  width: '100%',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'linear-gradient(145deg, #ffed4e, #ffd700)',
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 30px rgba(255, 215, 0, 0.3)',
    transform: 'translateY(-2px)',
  },
  
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}))

const ToggleText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: '#ffffff',
  textAlign: 'center',
  marginTop: '1.5rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

const ToggleButton = styled('button')(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: '#ffd700',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
  textDecoration: 'underline',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    color: '#ffed4e',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
  },
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '10px',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

const SuccessAlert = styled(Alert)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  background: 'rgba(16, 185, 129, 0.1)',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  borderRadius: '10px',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

interface RegisterFormProps {
  onToggleMode: () => void
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
  }

  if (success) {
    return (
      <FormContainer>
        <SuccessTitle>¡Registro Exitoso!</SuccessTitle>
        <FormDescription>
          Te hemos enviado un enlace de confirmación a tu email
        </FormDescription>
        
        <SuccessAlert>
          <AlertDescription>
            Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
          </AlertDescription>
        </SuccessAlert>
        
        <ToggleText>
          <ToggleButton type="button" onClick={onToggleMode}>
            Volver al login
          </ToggleButton>
        </ToggleText>
      </FormContainer>
    )
  }

  return (
    <FormContainer>
      <FormTitle>Crear Cuenta</FormTitle>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && (
          <StyledAlert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </StyledAlert>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="tu@email.com"
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <StyledLabel htmlFor="password">Contraseña</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            placeholder="••••••••"
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <StyledLabel htmlFor="confirmPassword">Confirmar Contraseña</StyledLabel>
          <StyledInput
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            placeholder="••••••••"
          />
        </div>
        
        <StyledButton type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear Cuenta
        </StyledButton>
      </form>
      
      <ToggleText>
        ¿Ya tienes una cuenta?{' '}
        <ToggleButton type="button" onClick={onToggleMode}>
          Inicia sesión aquí
        </ToggleButton>
      </ToggleText>
    </FormContainer>
  )
}
