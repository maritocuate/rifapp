'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LoginButton } from '@/components/LoginButton'
import { Button } from '@/components/ui/button'
import { styled } from '@mui/material/styles'
import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  textAlign: 'center',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0',
}))

const LoginButtonWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  zIndex: 10,
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.08), rgba(255, 215, 0, 0.03))',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
  width: '100%',
  marginTop: '-2rem',
  marginBottom: '2rem',
  borderRadius: '0 0 15px 15px',
  border: '1px solid rgba(255, 215, 0, 0.1)',

  [theme.breakpoints.down('md')]: {
    paddingBottom: '3rem',
  },
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '5rem',
  marginBottom: '2.5rem',
  position: 'relative',
  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.1))',
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontSize: 'clamp(1rem, 3vw, 2.8rem)',
  color: '#ffd700',
  lineHeight: 1.2,
  textAlign: 'center',
  marginBottom: '3rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  maxWidth: '800px',
  margin: '0 auto 2.8rem auto',
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  justifyContent: 'center',
  marginBottom: '2rem',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '0',
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 600,
  padding: '1rem 1rem',
  borderRadius: '15px',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  color: '#ffd700',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  transition: 'all 0.3s ease',
  height: '2.3rem',
  
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
  fontFamily: 'var(--font-cinzel), serif',
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  color: '#1a0033',
  border: '2px solid #ffd700',
  borderRadius: '30px',
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

interface HeroSectionProps {
  onShowAuthModal: () => void
}

export function HeroSection({ onShowAuthModal }: HeroSectionProps) {
  const { user } = useAuth()
  const router = useRouter()

  const handleCreateRaffle = () => {
    if (user) {
      router.push('/make')
    } else {
      onShowAuthModal()
    }
  }

  return (
    <ContentWrapper maxWidth="lg">
      <HeaderContainer>
        <LoginButtonWrapper>
          <LoginButton onShowAuthModal={onShowAuthModal} />
        </LoginButtonWrapper>
        
        <LogoContainer>
          <Image
            src="/images/logo3-md.png"
            alt="Riffita"
            width={110}
            height={120}
            priority
            style={{
              width: '110px',
              height: 'auto',
              maxWidth: '100%',
            }}
          />
        </LogoContainer>
        
        <Subtitle>
          Creá tu Rifa de Forma Fácil y de la Manera Más Transparente.
        </Subtitle>
        
        <ButtonContainer>
          <PrimaryButton size="lg" onClick={handleCreateRaffle}>
            Crear Rifa
          </PrimaryButton>
        </ButtonContainer>
      </HeaderContainer>
    </ContentWrapper>
  )
}
