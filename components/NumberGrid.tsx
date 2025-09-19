'use client'

import { styled } from '@mui/material/styles'
import { Box, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

const GridContainer = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  position: 'relative',
}))

const GridFrame = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(145deg, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #b8860b 75%, #ffd700 100%)',
  borderRadius: '20px',
  padding: '6px',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  position: 'relative',
}))

const GridInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'prizeImageUrl',
})<{ prizeImageUrl?: string }>(({ theme, prizeImageUrl }) => ({
  background: prizeImageUrl 
    ? `linear-gradient(rgba(45, 27, 105, 0.8), rgba(26, 0, 51, 0.8)), url(${prizeImageUrl})`
    : 'linear-gradient(145deg, #2d1b69, #1a0033)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '15px',
  padding: '20px',
  position: 'relative',
}))

const NumberButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'sold',
})<{ selected: boolean; sold: boolean }>(({ theme, selected, sold }) => ({
  width: '70px',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: sold ? 'not-allowed' : 'pointer',
  borderRadius: '12px',
  position: 'relative',
  background: sold
    ? 'linear-gradient(145deg, rgba(102, 102, 102, 0.3), rgba(68, 68, 68, 0.3))'
    : selected
    ? 'linear-gradient(145deg, #ffd700, #ffed4e)'
    : 'linear-gradient(145deg, #4a0e4e, #2d1b69)',
  border: sold
    ? '2px solid rgba(102, 102, 102, 0.5)'
    : selected 
    ? '3px solid #ffd700' 
    : '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: sold
    ? '0 0 5px rgba(102, 102, 102, 0.2)'
    : selected
    ? '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)'
    : '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',
  opacity: sold ? 0.3 : 1,

  '&:hover': {
    transform: sold ? 'none' : 'scale(1.05)',
    boxShadow: sold 
      ? '0 0 5px rgba(102, 102, 102, 0.3)'
      : '0 0 25px rgba(255, 215, 0, 0.6), inset 0 0 15px rgba(255, 215, 0, 0.2)',
    border: sold 
      ? '2px solid #666'
      : '3px solid rgba(255, 215, 0, 0.8)',
  },

  '&:active': {
    transform: sold ? 'none' : 'scale(0.98)',
  },
}))

const NumberText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'sold',
})<{ selected: boolean; sold: boolean }>(({ theme, selected, sold }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 900,
  fontSize: '1.5rem',
  color: sold ? '#999' : selected ? '#2d1b69' : '#ffd700',
  textShadow: sold 
    ? '0 0 5px rgba(153, 153, 153, 0.5)' 
    : selected 
    ? '0 0 10px rgba(45, 27, 105, 0.8)' 
    : '0 0 10px rgba(255, 215, 0, 0.8)',
  userSelect: 'none',
}))

interface NumberGridProps {
  onSelectionChange?: (selectedNumbers: Set<number>) => void
  soldNumbers?: number[]
  prizeImageUrl?: string
}

const NumberGrid: React.FC<NumberGridProps> = ({ onSelectionChange, soldNumbers = [], prizeImageUrl }) => {
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
          <Grid container spacing={1}>
            {numbers.map((num) => {
              const isSold = soldNumbers.includes(num)
              const isSelected = selectedNumbers.has(num)
              
              return (
                <Grid size={{ xs: 1.2 }} key={num}>
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

export default NumberGrid
