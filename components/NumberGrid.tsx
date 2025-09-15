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

const GridInner = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2d1b69, #1a0033)',
  borderRadius: '15px',
  padding: '20px',
  position: 'relative',
}))

const NumberButton = styled(Box)<{ selected: boolean }>(({ theme, selected }) => ({
  width: '70px',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '12px',
  position: 'relative',
  background: selected
    ? 'linear-gradient(145deg, #ffd700, #ffed4e)'
    : 'linear-gradient(145deg, #4a0e4e, #2d1b69)',
  border: selected ? '3px solid #ffd700' : '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: selected
    ? '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)'
    : '0 0 10px rgba(255, 215, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1)',

  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 25px rgba(255, 215, 0, 0.6), inset 0 0 15px rgba(255, 215, 0, 0.2)',
    border: '3px solid rgba(255, 215, 0, 0.8)',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },
}))

const NumberText = styled(Typography)<{ selected: boolean }>(({ theme, selected }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 900,
  fontSize: '1.5rem',
  color: selected ? '#2d1b69' : '#ffd700',
  textShadow: selected ? '0 0 10px rgba(45, 27, 105, 0.8)' : '0 0 10px rgba(255, 215, 0, 0.8)',
  userSelect: 'none',
}))

interface NumberGridProps {
  onSelectionChange?: (selectedNumbers: Set<number>) => void
}

const NumberGrid: React.FC<NumberGridProps> = ({ onSelectionChange }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set())

  const handleNumberClick = (num: number) => {
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
        <GridInner>
          <Grid container spacing={1}>
            {numbers.map((num) => (
              <Grid size={{ xs: 1.2 }} key={num}>
                <NumberButton
                  selected={selectedNumbers.has(num)}
                  onClick={() => handleNumberClick(num)}
                >
                  <NumberText selected={selectedNumbers.has(num)}>{num}</NumberText>
                </NumberButton>
              </Grid>
            ))}
          </Grid>
        </GridInner>
      </GridFrame>
    </GridContainer>
  )
}

export default NumberGrid
