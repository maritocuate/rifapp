'use client'

import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'
import { UserMenu } from '@/components/auth/UserMenu'
import { RafflesList } from '@/components/RafflesList'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Share2, DollarSign } from 'lucide-react'
import { styled } from '@mui/material/styles'
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CaretCircleRightIcon, UserIcon } from '@phosphor-icons/react'

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '2rem 0',
  position: 'relative',
}))

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  textAlign: 'center',
}))

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '2rem',
  right: '2rem',
  zIndex: 10,
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  lineHeight: 1,
  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 30%, #ffd700 60%, #b8860b 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  padding: '3rem 0',
  marginBottom: '1rem',
  position: 'relative',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)',
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: 'clamp(1rem, 3vw, 1.5rem)',
  color: '#ffffff',
  lineHeight: 1.6,
  textAlign: 'center',
  marginBottom: '3rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  maxWidth: '800px',
  margin: '0 auto 3rem auto',
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  justifyContent: 'center',
  marginBottom: '4rem',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '0',
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 600,
  padding: '1rem 2rem',
  borderRadius: '15px',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  color: '#ffd700',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 30px rgba(255, 215, 0, 0.2)',
  },
  
  [theme.breakpoints.down('md')]: {
    padding: '0.75rem',
    minWidth: 'auto',
    width: 'auto',
    marginBottom: '0',
  },
}))

const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  color: '#1a0033',
  border: '2px solid #ffd700',
  fontSize: '1.1rem',
  marginBottom: '1rem',
  
  '&:hover': {
    background: 'linear-gradient(145deg, #ffed4e, #ffd700)',
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 30px rgba(255, 215, 0, 0.3)',
  },

  [theme.breakpoints.down('md')]: {
    marginBottom: '0',
  }
}))

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '4rem',
  marginTop: '2rem',
  marginBottom: '4rem',
  
  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
    alignItems: 'center',
    marginBottom: '0',
  },
}))

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'rgba(255, 215, 0, 0.05)',
  },
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
  },
}))

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

const FeatureText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    textAlign: 'center',
  },
}))

const ButtonText = styled('span')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const ListsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',
  marginTop: '2rem',
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
}))


export default function Home() {
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <PageContainer className="geometric-bg">
      <HeaderWrapper>
        {user ? (
          <UserMenu />
        ) : (
          <StyledButton 
            onClick={() => setShowAuthModal(true)}
            variant="default"
            className='text-xs'
          >
            <UserIcon className="h-4 w-4" />
            <ButtonText className="ml-2">Iniciar Sesión</ButtonText>
          </StyledButton>
        )}
      </HeaderWrapper>
      
      <ContentWrapper maxWidth="lg">
        <MainTitle className="glow-text">Riffita</MainTitle>
        
        <Subtitle>
          Crea y gestiona rifas online de forma fácil, segura y transparente. 
          La plataforma definitiva para organizar sorteos digitales con total confianza.
        </Subtitle>
        
        <ButtonContainer>
          <PrimaryButton size="lg">
            Crear Rifa
            <CaretCircleRightIcon className="ml-4 h-5 w-5" />
          </PrimaryButton>
        </ButtonContainer>

        <FeaturesContainer>
          <FeatureItem>
            <FeatureIcon>
              <Plus className="h-5 w-5 text-yellow-400" />
            </FeatureIcon>
            <FeatureText>Crea tu rifa</FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <Share2 className="h-5 w-5 text-yellow-400" />
            </FeatureIcon>
            <FeatureText>Compartila</FeatureText>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </FeatureIcon>
            <FeatureText>Cobrá!</FeatureText>
          </FeatureItem>
        </FeaturesContainer>

        <ListsContainer>
          <RafflesList 
            type="recent" 
            title="Últimas Rifas Creadas" 
          />
          <RafflesList 
            type="almostFinished" 
            title="Por Finalizar" 
          />
        </ListsContainer>
      </ContentWrapper>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </PageContainer>
  )
}
