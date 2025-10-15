import { styled } from '@mui/material/styles'
import { Box, Typography, Card, CardContent, Divider, FormControlLabel, Checkbox, Link } from '@mui/material'

export const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1rem 0',
}))

export const StepTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#ffd700',
  textAlign: 'center',
  marginBottom: '0.5rem',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

export const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: '0.5rem',
  lineHeight: 1.6,
}))

export const ReviewCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
}))

export const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: '1.5rem',
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#ffd700',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}))

export const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  marginBottom: '1rem',
}))

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.7)',
}))

export const InfoValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  lineHeight: 1.4,
}))

export const HighlightValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#ffd700',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

export const SummaryBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '1rem',
}))

export const SummaryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#ffd700',
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}))

export const SummaryText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  lineHeight: 1.5,
}))

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'rgba(255, 215, 0, 0.2)',
  margin: '1rem 0',
}))

export const TermsContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '1rem',
}))

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#ffd700',
  '&.Mui-checked': {
    color: '#ffd700',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
}))

export const TermsLink = styled(Link)(({ theme }) => ({
  color: '#ffd700',
  textDecoration: 'underline',
  '&:hover': {
    color: '#ffed4e',
    textDecoration: 'underline',
  },
}))
