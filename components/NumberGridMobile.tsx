'use client'

import { styled } from '@mui/material/styles'
import { Box, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

const GridContainer = styled(Box)(({ theme }) => ({
  maxWidth: '400px',
  margin: '0 auto',
  position: 'relative',
}))

const GridFrame = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(145deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
  borderRadius: '15px',
  padding: '4px',
  boxShadow: '0 0 15px rgba(255, 215, 0, 0.3), inset 0 0 15px rgba(255, 215, 0, 0.1)',
  position: 'relative',
}))

const GridInner = styled(Box)<{ prizeImageUrl?: string }>(({ theme, prizeImageUrl }) => ({
  background: prizeImageUrl 
    ? `linear-gradient(rgba(45, 27, 105, 0.8), rgba(26, 0, 51, 0.8)), url(${prizeImageUrl})`
    : 'linear-gradient(145deg, #2d1b69, #1a0033)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '12px',
  padding: '6px',
  position: 'relative',
}))

const NumberButton = styled(Box)<{ selected: boolean; sold: boolean }>(({ theme, selected, sold }) => ({
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: sold ? 'not-allowed' : 'pointer',
  borderRadius: '8px',
  position: 'relative',
  background: sold
    ? 'linear-gradient(145deg, rgba(102, 102, 102, 0.3), rgba(68, 68, 68, 0.3))'
    : selected
    ? 'linear-gradient(145deg, #ffd700, #ffed4e)'
    : 'linear-gradient(145deg, #4a0e4e, #2d1b69)',
  border: sold
    ? '1px solid rgba(102, 102, 102, 0.5)'
    : selected 
    ? '2px solid #ffd700' 
    : '1px solid rgba(255, 215, 0, 0.3)',
  boxShadow: sold
    ? '0 0 5px rgba(102, 102, 102, 0.2)'
    : selected
    ? '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.3)'
    : '0 0 8px rgba(255, 215, 0, 0.2), inset 0 0 8px rgba(255, 255, 255, 0.1)',
  opacity: sold ? 0.3 : 1,

  '&:hover': {
    transform: sold ? 'none' : 'scale(1.05)',
    boxShadow: sold 
      ? '0 0 5px rgba(102, 102, 102, 0.3)'
      : '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 12px rgba(255, 215, 0, 0.2)',
    border: sold 
      ? '1px solid #666'
      : '2px solid rgba(255, 215, 0, 0.8)',
  },

  '&:active': {
    transform: sold ? 'none' : 'scale(0.98)',
  },
}))

const NumberText = styled(Typography)<{ selected: boolean; sold: boolean }>(({ theme, selected, sold }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 900,
  fontSize: '1.1rem',
  color: sold ? '#999' : selected ? '#2d1b69' : '#ffd700',
  textShadow: sold 
    ? '0 0 5px rgba(153, 153, 153, 0.5)' 
    : selected 
    ? '0 0 8px rgba(45, 27, 105, 0.8)' 
    : '0 0 8px rgba(255, 215, 0, 0.8)',
  userSelect: 'none',
}))

interface NumberGridMobileProps {
  onSelectionChange?: (selectedNumbers: Set<number>) => void
  soldNumbers?: number[]
  prizeImageUrl?: string
}

const NumberGridMobile: React.FC<NumberGridMobileProps> = ({ onSelectionChange, soldNumbers = [], prizeImageUrl }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set())

  const handleNumberClick = (num: number) => {
    // No permitir seleccionar números vendidos
    if (soldNumbers.includes(num)) {
      return
    }
    
    setSelectedNumbers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(num)) {
        newSet.delete(num)
      } else {
        newSet.add(num)
      }
      return newSet
    })
  }

  // Use useEffect to notify parent when selectedNumbers changes
  useEffect(() => {
    onSelectionChange?.(selectedNumbers)
  }, [selectedNumbers, onSelectionChange])

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1)

  return (
    <GridContainer>
      <GridFrame>
        <GridInner prizeImageUrl={prizeImageUrl}>
          <Grid container spacing={0.3}>
            {numbers.map((num) => {
              const isSold = soldNumbers.includes(num)
              const isSelected = selectedNumbers.has(num)
              
              return (
                <Grid size={{ xs: 2.4 }} key={num}>
                  <NumberButton
                    selected={isSelected}
                    sold={isSold}
                    onClick={() => handleNumberClick(num)}
                  >
                    <NumberText selected={isSelected} sold={isSold}>
                      {num}
                    </NumberText>
                  </NumberButton>
                </Grid>
              )
            })}
          </Grid>
        </GridInner>
      </GridFrame>
    </GridContainer>
  )
}

export default NumberGridMobile
