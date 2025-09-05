'use client'

import { styled } from '@mui/material/styles'
import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'

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

const GridInner = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #2d1b69, #1a0033)',
  borderRadius: '12px',
  padding: '6px',
  position: 'relative',
}))

const NumberButton = styled(Box)<{ selected: boolean }>(({ theme, selected }) => ({
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '8px',
  position: 'relative',
  background: selected
    ? 'linear-gradient(145deg, #ffd700, #ffed4e)'
    : 'linear-gradient(145deg, #4a0e4e, #2d1b69)',
  border: selected ? '2px solid #ffd700' : '1px solid rgba(255, 215, 0, 0.3)',
  boxShadow: selected
    ? '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.3)'
    : '0 0 8px rgba(255, 215, 0, 0.2), inset 0 0 8px rgba(255, 255, 255, 0.1)',

  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 12px rgba(255, 215, 0, 0.2)',
    border: '2px solid rgba(255, 215, 0, 0.8)',
  },

  '&:active': {
    transform: 'scale(0.98)',
  },
}))

const NumberText = styled(Typography)<{ selected: boolean }>(({ theme, selected }) => ({
  fontFamily: "'Orbitron', monospace",
  fontWeight: 900,
  fontSize: '1.1rem',
  color: selected ? '#2d1b69' : '#ffd700',
  textShadow: selected ? '0 0 8px rgba(45, 27, 105, 0.8)' : '0 0 8px rgba(255, 215, 0, 0.8)',
  userSelect: 'none',
}))

const NumberGridMobile: React.FC = () => {
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

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1)

  return (
    <GridContainer>
      <GridFrame>
        <GridInner>
          <Grid container spacing={0.3}>
            {numbers.map((num) => (
              <Grid size={{ xs: 2.4 }} key={num}>
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

export default NumberGridMobile
