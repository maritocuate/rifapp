'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1rem 2rem',
  background: 'rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(255, 215, 0, 0.2)',
  marginTop: 'auto',
  
  [theme.breakpoints.down('md')]: {
    padding: '0.75rem 1rem',
    flexDirection: 'column',
    gap: '0.5rem',
  },
}))

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  width: '100%',
  padding: '0 2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '0.5rem',
  },
}))

const FooterText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.6rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
  },
}))

const FooterSeparator = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.6rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const FooterLink = styled('a')(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.6rem',
  color: '#ffd700',
  textDecoration: 'none',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    color: '#ffed4e',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
  },
  
  [theme.breakpoints.down('md')]: {
    fontSize: '0.75rem',
  },
}))

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>v0.9</FooterText>
        <FooterSeparator>•</FooterSeparator>
        <FooterLink href="/terminos">
          Bases y Condiciones
        </FooterLink>
        <FooterSeparator>•</FooterSeparator>
        <FooterText>{new Date().getFullYear()}</FooterText>
      </FooterContent>
    </FooterContainer>
  )
}
