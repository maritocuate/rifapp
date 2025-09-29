import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const ListSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.03))',
  borderRadius: '15px',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
}))

export const ListTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 600,
  fontSize: '1.3rem',
  color: '#ffd700',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
  marginBottom: '1.5rem',
  textAlign: 'center',
}))

export const ListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 0',
  borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  
  '&:last-child': {
    borderBottom: 'none',
  },
  
  '&:hover': {
    background: 'rgba(255, 215, 0, 0.1)',
    borderRadius: '8px',
    padding: '0.75rem',
    margin: '0 -0.75rem',
    transform: 'translateX(4px)',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
  },
}))

export const RifaName = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  flex: 1,
  marginRight: '1rem',
  textAlign: 'left',
}))

export const RifaStats = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.8rem',
  color: '#ffd700',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
  fontWeight: 600,
}))

export const SkeletonItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 0',
  borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
  
  '&:last-child': {
    borderBottom: 'none',
  },
}))

export const RifaNameContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flex: 1,
  marginRight: '1rem',
}))

