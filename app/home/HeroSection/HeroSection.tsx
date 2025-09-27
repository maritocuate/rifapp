'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserMenu } from '@/components/auth/UserMenu'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { styled } from '@mui/material/styles'
import { Box, Container, Typography } from '@mui/material'
import { CaretCircleRightIcon, UserIcon } from '@phosphor-icons/react'
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
  padding: '3rem 0',
  marginBottom: '1rem',
  position: 'relative',
  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.1))',
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: 'clamp(1rem, 3vw, 1.4rem)',
  color: '#ffd700',
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
          {user ? (
            <UserMenu />
          ) : (
            <Button 
              onClick={onShowAuthModal}
              variant="ghost"
              className="relative p-0 h-11 w-11 rounded-full border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 backdrop-blur-sm hover:from-yellow-400/20 hover:to-yellow-400/10 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20"
            >
              <UserIcon className="h-4 w-4 text-yellow-400" />
            </Button>
          )}
        </LoginButtonWrapper>
        
        <LogoContainer>
          <Image
            src="/images/logo3-md.png"
            alt="Riffita"
            width={400}
            height={120}
            priority
            style={{
              width: 'clamp(250px, 17vw, 400px)',
              height: 'auto',
              maxWidth: '100%',
            }}
          />
        </LogoContainer>
        
        <Subtitle>
          Creá rifas y sorteos online de forma fácil.
          Participá en los sorteos de forma segura y transparente.
        </Subtitle>
        
        <ButtonContainer>
          <PrimaryButton size="lg" onClick={handleCreateRaffle}>
            Crear Rifa
            <CaretCircleRightIcon className="ml-4 h-5 w-5" />
          </PrimaryButton>
        </ButtonContainer>
      </HeaderContainer>
    </ContentWrapper>
  )
}
