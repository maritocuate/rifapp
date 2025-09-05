'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

const PopupContainer = styled(Box)<{ isVisible: boolean; isExiting: boolean }>(
  ({ theme, isVisible, isExiting }) => ({
    position: 'fixed',
    bottom: '30px',
    left: '30px',
    background: 'rgba(255, 215, 0, 0.9)',
    borderRadius: '15px',
    padding: '15px 20px',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 10px rgba(255, 215, 0, 0.3)',
    border: '3px solid #ffd700',
    zIndex: 1000,
    minWidth: '120px',
    textAlign: 'center',
    animation: isExiting ? 'slideOut 0.3s ease-in forwards' : 'slideIn 0.3s ease-out',

    '@keyframes slideIn': {
      from: {
        transform: 'translateX(-10%)',
        opacity: 0,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },

    '@keyframes slideOut': {
      from: {
        transform: 'translateX(0)',
        opacity: 1,
      },
      to: {
        transform: 'translateX(-10%)',
        opacity: 0,
      },
    },
  })
)

const AmountText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Orbitron', monospace",
  fontWeight: 900,
  fontSize: '1.5rem',
  color: '#2d1b69',
  textShadow: '0 0 10px rgba(45, 27, 105, 0.8)',
  margin: 0,
}))

const LabelText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Orbitron', monospace",
  fontWeight: 600,
  fontSize: '0.8rem',
  color: '#2d1b69',
  textShadow: '0 0 5px rgba(45, 27, 105, 0.6)',
  margin: '0 0 5px 0',
  opacity: 0.8,
}))

interface SelectionPopupProps {
  selectedCount: number
}

const TotalPopup: React.FC<SelectionPopupProps> = ({ selectedCount }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (selectedCount > 0) {
      // Mostrar el popup
      setIsVisible(true)
      setIsExiting(false)
    } else if (isVisible) {
      // Iniciar animación de salida
      setIsExiting(true)
      // Ocultar el popup después de la animación
      const timer = setTimeout(() => {
        setIsVisible(false)
        setIsExiting(false)
      }, 300) // 300ms coincide con la duración de la animación

      return () => clearTimeout(timer)
    }
  }, [selectedCount, isVisible])

  if (!isVisible) return null

  const totalAmount = selectedCount * 5

  return (
    <PopupContainer isVisible={isVisible} isExiting={isExiting}>
      <LabelText>Total</LabelText>
      <AmountText>${totalAmount}</AmountText>
    </PopupContainer>
  )
}

export default TotalPopup
