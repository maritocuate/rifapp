'use client'

import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

interface MainTitleProps {
  children: React.ReactNode
  className?: string
}

const StyledMainTitle = styled(Typography)(({ theme }) => ({
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
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',

  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(2.5rem, 8vw, 3rem)',
    padding: '1rem 0',
  },
}))

const MainTitle: React.FC<MainTitleProps> = ({ children, className }) => {
  return <StyledMainTitle className={className}>{children}</StyledMainTitle>
}

export default MainTitle
