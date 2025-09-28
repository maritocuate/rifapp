'use client'

import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

interface SecondaryTitleProps {
  children: React.ReactNode
  className?: string
}

const StyledSecondaryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 600,
  lineHeight: 1.2,
  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  color: '#ffffff',
  textAlign: 'center',
  padding: '1.5rem 0',
  position: 'relative',
  borderRadius: '8px',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
  
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.2rem, 5vw, 2rem)',
    padding: '1rem 1rem',
  },
}))

const SecondaryTitle: React.FC<SecondaryTitleProps> = ({ children, className }) => {
  return <StyledSecondaryTitle className={className}>{children}</StyledSecondaryTitle>
}

export default SecondaryTitle
