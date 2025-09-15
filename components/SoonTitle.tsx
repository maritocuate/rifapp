'use client'

import { styled } from '@mui/material/styles'
import { Typography, Box } from '@mui/material'
import MainTitle from '@/components/MainTitle'

const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
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
