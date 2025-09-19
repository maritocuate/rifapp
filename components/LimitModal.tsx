'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

const ModalContainer = styled(Box)(({ theme }) => ({
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

const ModalTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: '1.8rem',
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 30%, #ffd700 60%, #b8860b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '1.5rem',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
}))

const MessageText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '1rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  lineHeight: 1.5,
}))

const SubMessageText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.7)',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  fontWeight: 600,
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  color: '#000000',
  border: 'none',
  borderRadius: '12px',
  padding: '0.75rem 2rem',
  width: '100%',
  textShadow: 'none',
  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(145deg, #ffed4e, #ffd700)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
}))

interface LimitModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LimitModal({ isOpen, onClose }: LimitModalProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-none bg-transparent p-0">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Límite de Números
          </DialogTitle>
        </DialogHeader>
        <ModalContainer>
          <ModalTitle>
            <AlertTriangle style={{ color: '#ffd700', fontSize: '1.5rem' }} />
            Límite de Números
          </ModalTitle>
          
          <MessageText>
            Solo puedes seleccionar un máximo de <span style={{ color: '#ffd700', fontWeight: 'bold' }}>10 números</span> por compra.
          </MessageText>
          
          <SubMessageText>
            Por favor, deselecciona algunos números para continuar.
          </SubMessageText>
          
          <StyledButton onClick={handleClose}>
            Entendido
          </StyledButton>
        </ModalContainer>
      </DialogContent>
    </Dialog>
  )
}
