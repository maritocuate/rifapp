'use client'

import { styled } from '@mui/material/styles'
import { Typography, Box } from '@mui/material'
import MainTitle from '@/components/MainTitle'

const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '3rem',
  position: 'relative',
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Orbitron', monospace",
  fontWeight: 400,
  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
  color: '#ffd700',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  marginBottom: '0.5rem',
}))

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: "'Orbitron', monospace",
  fontWeight: 300,
  fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
  color: 'rgba(255, 215, 0, 0.8)',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
}))

const CasinoTitle: React.FC = () => {
  return (
    <TitleContainer>
      <SubTitle>Welcome to</SubTitle>
      <MainTitle className="glow-text">GOLDEN NUMBERS</MainTitle>
      <Description>
        Choose your lucky numbers and feel the thrill of the game. Every number holds the promise of
        fortune!
      </Description>
    </TitleContainer>
  )
}

export default CasinoTitle
