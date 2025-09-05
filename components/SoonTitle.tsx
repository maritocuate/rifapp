'use client'

import { styled } from '@mui/material/styles'
import { Typography, Box } from '@mui/material'

const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Cinzel', serif",
  fontWeight: 700,
  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 30%, #ffd700 60%, #b8860b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  animation: 'pulse 3s ease-in-out infinite',
}))

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: "'Cinzel', serif",
  fontWeight: 300,
  fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
  color: 'rgba(255, 215, 0, 0.8)',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
}))

const SoonTitle: React.FC = () => {
  return (
    <TitleContainer>
      <MainTitle className="glow-text">Riffita</MainTitle>
      <Description>Proximamente</Description>
    </TitleContainer>
  )
}

export default SoonTitle
