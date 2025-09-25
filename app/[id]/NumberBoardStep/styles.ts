import styled from '@emotion/styled'
import { Box, Container } from '@mui/material'

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '2rem 0',
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
  gap: { xs: '0.5rem', md: '1rem' },
  fontSize: '1.1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
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
  display: { xs: 'none', md: 'block' },
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
