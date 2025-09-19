'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DetailsContainer = styled(Box)(({ theme }) => ({
  marginTop: '3rem',
  padding: '2rem',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  borderRadius: '20px',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  position: 'relative',
  backdropFilter: 'blur(10px)',
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 600,
  fontSize: '1.5rem',
  color: '#ffd700',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
  marginBottom: '1rem',
  textAlign: 'center',
}))

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  lineHeight: 1.6,
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

const PrizeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: '1.8rem',
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',
}))

const SeparatorLine = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)',
  margin: '2rem 0 1rem 0',
}))

const HomeLogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  opacity: 0.7,
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.05)',
    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
  },
}))


interface EventDetailsProps {
  description: string
  prize: string
}

const EventDetails: React.FC<EventDetailsProps> = ({
  description,
  prize
}) => {
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <DetailsContainer>
      <SectionTitle>Detalles del Sorteo</SectionTitle>
      
      <DescriptionText>
        {description}
      </DescriptionText>
      
      <PrizeText>
        🏆 Premio: {prize}
      </PrizeText>
      
      <SeparatorLine />
      
      <HomeLogoContainer onClick={handleGoHome}>
        <Image
          src="/images/logo3-md.png"
          alt="Riffita - Volver al inicio"
          width={120}
          height={36}
          style={{
            width: 'auto',
            height: '40px',
            maxWidth: '100%',
          }}
        />
      </HomeLogoContainer>
    </DetailsContainer>
  )
}

export default EventDetails
