import { styled } from '@mui/material/styles'
import { Box, Typography, Button } from '@mui/material'

export const PopupContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'isExiting',
})<{
  isVisible: boolean
  isExiting: boolean
}>(({ theme, isVisible, isExiting }) => ({
  position: 'sticky',
  bottom: '25px',
  width: '130px',
  background: 'rgba(255, 215, 0, 0.9)',
  borderRadius: '15px',
  padding: '15px 20px',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), inset 0 0 10px rgba(255, 215, 0, 0.3)',
  border: '3px solid #ffd700',
  zIndex: 1000,
  minWidth: '120px',
  textAlign: 'center',
  animation: isExiting ? 'slideOut 0.3s ease-in forwards' : 'slideIn 0.3s ease-out',
  alignSelf: 'flex-start',
  marginTop: 'auto',
  flexShrink: 0,

  [theme.breakpoints.up('md')]: {
    padding: '35px 20px',
    width: '170px',
  },

  '@keyframes slideIn': {
    from: {
      transform: 'translateX(-10%)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },

  '@keyframes slideOut': {
    from: {
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      transform: 'translateX(-10%)',
      opacity: 0,
    },
  },
}))

export const AmountText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 900,
  fontSize: '1.5rem',
  color: '#2d1b69',
  textShadow: '0 0 10px rgba(45, 27, 105, 0.8)',
  marginBottom: -25,
  display: 'inline-block',
}))

export const LabelText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 600,
  fontSize: '0.8rem',
  color: '#2d1b69',
  textShadow: '0 0 5px rgba(45, 27, 105, 0.6)',
  margin: '0 0 5px 0',
  opacity: 0.8,
}))

export const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 700,
  fontSize: '0.9rem',
  color: '#ffed4e',
  background: 'linear-gradient(145deg,rgb(135, 25, 143), #2d1b69)',
  borderRadius: '0 0 12px 12px',
  padding: '16px 16px',
  marginTop: '10px',
  width: 'calc(100% + 40px)',
  left: '-20px',
  bottom: '-15px',
  textTransform: 'none',
  textShadow: '0 1px 2px rgba(45, 27, 105, 0.3)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'linear-gradient(145deg,rgb(94, 22, 99),rgb(73, 54, 138))',
  },

  [theme.breakpoints.up('md')]: {
    bottom: '-35px',
  },
}))
