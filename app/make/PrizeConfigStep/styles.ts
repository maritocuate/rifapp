import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, Alert, Slider } from '@mui/material'

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
  marginBottom: '1rem',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

export const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: '2rem',
  lineHeight: 1.6,
}))

export const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}))

export const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: '1rem',
  fontWeight: 500,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}))

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    
    '& fieldset': {
      border: 'none',
    },
    
    '&:hover fieldset': {
      border: '1px solid rgba(255, 215, 0, 0.3)',
    },
    
    '&.Mui-focused fieldset': {
      border: '2px solid #ffd700',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
    },
  },
  
  '& .MuiInputLabel-root': {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    color: 'rgba(255, 255, 255, 0.7)',
    
    '&.Mui-focused': {
      color: '#ffd700',
    },
  },
  
  '& .MuiFormHelperText-root': {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    color: '#ff6b6b',
    fontSize: '0.85rem',
  },
}))

export const CostInfo = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 215, 0, 0.1)',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '0.5rem',
}))

export const CostInfoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  lineHeight: 1.5,
}))

export const DetailsText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: '0.6rem',
  color: 'rgba(255, 255, 255, 0.8)',
  lineHeight: 1.5,
}))

export const ProfanityAlert = styled(Alert)(({ theme }) => ({
  marginTop: '0.5rem',
}))

export const SliderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem 2rem',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '10px',
  border: '1px solid rgba(255, 215, 0, 0.2)',
}))

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#ffd700',
  height: 8,
  
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(90deg, #ffd700 0%, #ffed4e 100%)',
    height: 8,
    borderRadius: 4,
  },
  
  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 8,
    borderRadius: 4,
  },
  
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#ffd700',
    border: '2px solid #ffffff',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
  },
  
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#ffd700',
    color: '#000000',
    fontFamily: 'var(--font-orbitron), monospace',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    borderRadius: '6px',
    padding: '4px 8px',
    
    '&:before': {
      borderTopColor: '#ffd700',
    },
  },
}))

export const SliderValueDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '1rem',
}))

export const SliderValueText = styled(Typography)(({ theme }) => ({
  color: '#ffd700',
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.2rem',
  fontWeight: 'bold',
}))
