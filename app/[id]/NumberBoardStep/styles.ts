'use client'

import styled from '@emotion/styled'
import { Box, Container } from '@mui/material'

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '1rem 0 2rem 0',
  position: 'relative',
}))

export const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  textAlign: 'center',
}))

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3rem 0',
  marginBottom: '1rem',
  position: 'relative',
  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.1))',
}))

export const GridSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '2rem',
  
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
}))

export const RaffleInfoContainer = styled(Box)(({ theme }) => ({
  margin: '1.5rem 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
  
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    gap: '0.5rem',
  },
}))

export const CostInfo = styled(Box)(({ theme }) => ({
  display: 'flex', 
  alignItems: 'center', 
  gap: '0.5rem',
  color: '#FFD700',
  fontWeight: '500',
}))

export const Separator = styled(Box)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '1.2rem',
  display: 'none',
  
  '@media (min-width: 900px)': {
    display: 'block',
  },
}))

export const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex', 
  alignItems: 'center', 
  gap: '0.5rem',
  color: 'rgba(255, 255, 255, 0.9)',
}))

export const AvailableInfo = styled(Box)(({ theme }) => ({
  display: 'flex', 
  alignItems: 'center', 
  gap: '0.5rem',
  color: 'rgba(255, 255, 255, 0.9)',
}))

export const HeaderContainer = styled(Box)({
  background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.08), rgba(255, 215, 0, 0.03))',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
  width: '100%',
  marginTop: '-1rem',
  marginBottom: '2rem',
  borderRadius: '0 0 15px 15px',
  border: '1px solid rgba(255, 215, 0, 0.1)',
  position: 'relative',

  '@media (max-width: 900px)': {
    paddingTop: '4rem',
  },
})

export const LoginButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  zIndex: 10,
})

export const HomeButtonWrapper = styled(Box)({
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  zIndex: 10,
})

export const RaffleFinishedContainer = styled(Box)(({ theme }) => ({
  margin: '1.5rem 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem',
  background: 'linear-gradient(145deg, rgba(255, 0, 0, 0.1), rgba(255, 100, 100, 0.05))',
  border: '2px solid rgba(255, 0, 0, 0.3)',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
}))

export const FinishedIcon = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))',
}))

export const FinishedMessage = styled(Box)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: '600',
  color: '#FF6B6B',
  textAlign: 'center',
  textShadow: '0 0 10px rgba(255, 107, 107, 0.5)',
  lineHeight: 1.4,
}))

export const WinnerInfo = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  padding: '1rem',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'center',
}))

export const WinnerNumber = styled(Box)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: '700',
  color: '#FFD700',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
  textAlign: 'center',
}))

export const WinnerUsername = styled(Box)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#FFA500',
  textShadow: '0 0 8px rgba(255, 165, 0, 0.5)',
  textAlign: 'center',
}))