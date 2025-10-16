'use client'

import { useEffect, useState, useMemo } from 'react'
import { Box, IconButton, Typography, styled, keyframes } from '@mui/material'
import { CheckCircle, X } from '@phosphor-icons/react'
import { SUCCESS_AUTO_CLOSE_DELAY, ANIMATION_DELAY } from './constants'

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`

const SuccessContainer = styled(Box)<{ isVisible: boolean }>(({ theme, isVisible }) => ({
  position: 'fixed',
  top: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 2.5),
  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
  color: 'white',
  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
  animation: `${isVisible ? slideIn : slideOut} 0.3s ease-out`,
  minWidth: 300,
  maxWidth: '90vw'
}))

const SuccessIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
})

const SuccessMessage = styled(Typography)({
  fontWeight: 600,
  fontSize: 14,
  flex: 1,
  textAlign: 'center'
})

const CloseButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  borderRadius: theme.spacing(0.75),
  padding: theme.spacing(0.5),
  flexShrink: 0,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  }
}))

interface ShareSuccessProps {
  isVisible: boolean
  onClose: () => void
  message?: string
}

export function ShareSuccess({ isVisible, onClose, message = '¡Rifa compartida exitosamente!' }: ShareSuccessProps) {
  const [shouldRender, setShouldRender] = useState(isVisible)

  const animationProps = useMemo(() => ({
    animation: `${isVisible ? slideIn : slideOut} 0.3s ease-out`
  }), [isVisible])

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onClose()
      }, SUCCESS_AUTO_CLOSE_DELAY)

      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, ANIMATION_DELAY)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!shouldRender) return null

  return (
    <SuccessContainer isVisible={isVisible} sx={animationProps}>
      <SuccessIcon>
        <CheckCircle size={24} />
      </SuccessIcon>
      <SuccessMessage>{message}</SuccessMessage>
      <CloseButton onClick={onClose} aria-label="Cerrar mensaje">
        <X size={16} />
      </CloseButton>
    </SuccessContainer>
  )
}
