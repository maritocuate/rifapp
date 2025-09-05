'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const PopupContainer = styled(Box)<{
  isVisible: boolean
  isExiting: boolean
}>(({ theme, isVisible, isExiting }) => ({
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
}))

const AmountText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Orbitron', monospace",
  fontWeight: 900,
  fontSize: '1.5rem',
  color: '#2d1b69',
  textShadow: '0 0 10px rgba(45, 27, 105, 0.8)',
  margin: 0,
  display: 'inline-block',
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
  const previousTotalRef = useRef<number>(0)
  const amountTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const totalAmount = selectedCount * 5

    if (selectedCount > 0) {
      setIsVisible(true)
      setIsExiting(false)

      if (previousTotalRef.current > 0 && previousTotalRef.current !== totalAmount) {
        if (amountTextRef.current) {
          gsap.fromTo(
            amountTextRef.current,
            {
              y: 20,
            },
            {
              y: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)',
            }
          )
        }
      }

      previousTotalRef.current = totalAmount
    } else if (isVisible) {
      setIsExiting(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setIsExiting(false)
        previousTotalRef.current = 0
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [selectedCount, isVisible])

  if (!isVisible) return null

  const totalAmount = selectedCount * 5

  return (
    <PopupContainer isVisible={isVisible} isExiting={isExiting}>
      <LabelText>Total</LabelText>
      <AmountText ref={amountTextRef}>${totalAmount}</AmountText>
    </PopupContainer>
  )
}

export default TotalPopup
