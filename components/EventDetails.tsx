'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, Avatar, useMediaQuery, useTheme } from '@mui/material'

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

const AuthorSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem',
  background: 'linear-gradient(145deg, rgba(45, 27, 105, 0.8), rgba(26, 0, 51, 0.8))',
  borderRadius: '15px',
  border: '1px solid rgba(255, 215, 0, 0.3)',
}))

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: '60px',
  height: '60px',
  border: '3px solid #ffd700',
  boxShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
}))

const AuthorInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}))

const AuthorLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: '#ffd700',
  opacity: 0.8,
  marginBottom: '0.25rem',
}))

const AuthorName = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 600,
  fontSize: '1.2rem',
  color: '#ffffff',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
}))

interface EventDetailsProps {
  description: string
  prize: string
  authorNickname: string
  authorAvatar?: string
}

const EventDetails: React.FC<EventDetailsProps> = ({
  description,
  prize,
  authorNickname,
  authorAvatar
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <DetailsContainer>
      <SectionTitle>Detalles del Evento</SectionTitle>
      
      <DescriptionText>
        {description}
      </DescriptionText>
      
      <PrizeText>
        🏆 Premio: {prize}
      </PrizeText>
      
      <AuthorSection>
        <AuthorAvatar 
          src={authorAvatar} 
          alt={authorNickname}
        >
          {authorNickname.charAt(0).toUpperCase()}
        </AuthorAvatar>
        <AuthorInfo>
          <AuthorLabel>Organizador</AuthorLabel>
          <AuthorName>{authorNickname}</AuthorName>
        </AuthorInfo>
      </AuthorSection>
    </DetailsContainer>
  )
}

export default EventDetails
