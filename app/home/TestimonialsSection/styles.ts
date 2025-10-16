import { styled } from '@mui/material/styles'
import { Box, Typography, Button } from '@mui/material'

export const TestimonialsContainer = styled(Box)(({ theme }) => ({
  padding: '4rem 0',
  background: 'linear-gradient(135deg, rgba(26, 0, 51, 0.05) 0%, rgba(45, 27, 105, 0.05) 25%, rgba(106, 5, 114, 0.05) 50%, rgba(45, 27, 105, 0.05) 75%, rgba(26, 0, 51, 0.05) 100%)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.02) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 215, 0, 0.02) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 215, 0, 0.02) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 215, 0, 0.02) 75%)',
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
    animation: 'moveBackground 20s linear infinite',
  },
  
  [theme.breakpoints.down('md')]: {
    padding: '2rem 0',
  },
}))

export const TestimonialsContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  position: 'relative',
  zIndex: 1,
  
  [theme.breakpoints.up('sm')]: {
    padding: '0 1.5rem',
  },
  
  [theme.breakpoints.up('lg')]: {
    padding: '0 2rem',
  },
}))

export const TestimonialsHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '3rem',
}))

export const TestimonialsTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#ffd700',
  marginBottom: '1rem',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
  
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
}))

export const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
}))

export const SliderWrapper = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
}))

export const SliderTrack = styled(Box)<{ translateX: number; cardsToShow: number }>(({ theme, translateX, cardsToShow }) => ({
  display: 'flex',
  transition: 'transform 0.3s ease-in-out',
  transform: `translateX(-${translateX * (100 / cardsToShow)}%)`,
}))

export const SlideItem = styled(Box)<{ cardsToShow: number }>(({ theme, cardsToShow }) => ({
  flexShrink: 0,
  padding: '0 0.75rem',
  width: `${100 / cardsToShow}%`,
}))

export const NavigationButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  color: '#ffd700',
  minWidth: '40px',
  height: '40px',
  borderRadius: '50%',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.4), inset 0 0 30px rgba(255, 215, 0, 0.2)',
  },
  
  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  
  '&.prev': {
    left: 0,
    transform: 'translateY(-50%) translateX(-1rem)',
  },
  
  '&.next': {
    right: 0,
    transform: 'translateY(-50%) translateX(1rem)',
  },
}))

export const DotsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
  gap: '0.5rem',
}))

export const Dot = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: active ? '#ffd700' : 'rgba(255, 215, 0, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: active ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none',
  
  '&:hover': {
    backgroundColor: active ? '#ffd700' : 'rgba(255, 215, 0, 0.5)',
    boxShadow: '0 0 8px rgba(255, 215, 0, 0.3)',
  },
}))

// TestimonialCard styles
export const CardContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '15px',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)',
  padding: '1.5rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
}))

export const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
}))

export const Avatar = styled(Box)(({ theme }) => ({
  width: '3rem',
  height: '3rem',
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  color: '#1a0033',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.125rem',
  fontWeight: '600',
  marginRight: '1rem',
  flexShrink: 0,
  boxShadow: '0 0 15px rgba(255, 215, 0, 0.3), inset 0 0 15px rgba(255, 215, 0, 0.1)',
}))

export const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}))

export const UserName = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: '600',
  color: '#ffffff',
  fontSize: '1rem',
  marginBottom: '0.25rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

export const StarsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.125rem',
}))

export const StarIcon = styled(Box)<{ filled: boolean }>(({ theme, filled }) => ({
  width: '1rem',
  height: '1rem',
  color: filled ? '#ffd700' : 'rgba(255, 215, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  filter: filled ? 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))' : 'none',
}))

export const ReviewContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '120px', // Altura fija para mantener consistencia
  overflow: 'hidden',
}))

export const ReviewText = styled(Typography)<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  color: '#ffffff',
  lineHeight: 1.625,
  fontSize: '0.875rem',
  marginBottom: '0.5rem',
  textShadow: '0 0 3px rgba(255, 255, 255, 0.2)',
  overflow: isExpanded ? 'auto' : 'hidden',
  maxHeight: isExpanded ? '100%' : '3rem', // Aproximadamente 3 líneas
  transition: 'max-height 0.3s ease',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 215, 0, 0.1)',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 215, 0, 0.3)',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255, 215, 0, 0.5)',
  },
}))

export const ReadMoreButton = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  color: '#ffd700',
  fontWeight: '500',
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
  
  '&:hover': {
    color: '#ffed4e',
    textShadow: '0 0 8px rgba(255, 215, 0, 0.5)',
  },
}))
