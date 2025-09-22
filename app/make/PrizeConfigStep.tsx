'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, InputAdornment } from '@mui/material'
import { Gift, DollarSign, Image as ImageIcon } from 'lucide-react'

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1rem 0',
}))

const StepTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#ffd700',
  textAlign: 'center',
  marginBottom: '1rem',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: '2rem',
  lineHeight: 1.6,
}))

const FieldContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}))

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  fontWeight: 500,
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontFamily: 'var(--font-orbitron), monospace',
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
    fontFamily: 'var(--font-orbitron), monospace',
    color: 'rgba(255, 255, 255, 0.7)',
    
    '&.Mui-focused': {
      color: '#ffd700',
    },
  },
  
  '& .MuiFormHelperText-root': {
    fontFamily: 'var(--font-orbitron), monospace',
    color: '#ff6b6b',
    fontSize: '0.85rem',
  },
}))

const CostInfo = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 215, 0, 0.1)',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '0.5rem',
}))

const CostInfoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  lineHeight: 1.5,
}))

interface PrizeConfigStepProps {
  data: {
    prize_description: string
    prize_image_url: string
    number_cost: number
  }
  onUpdate: (updates: { 
    prize_description?: string
    prize_image_url?: string
    number_cost?: number
  }) => void
  errors: Record<string, string>
}

export function PrizeConfigStep({ data, onUpdate, errors }: PrizeConfigStepProps) {
  return (
    <StepContainer>
      <StepTitle>Configuración del Premio</StepTitle>
      <StepDescription>
        Definí los detalles del premio y el costo por número
      </StepDescription>

      <FieldContainer>
        <FieldLabel>
          <Gift className="h-4 w-4 text-yellow-400" />
          Descripción del Premio
        </FieldLabel>
        <StyledTextField
          fullWidth
          multiline
          rows={3}
          placeholder="Ej: iPhone 15 Pro Max 256GB Color Natural Titanio, nuevo en caja sellada"
          value={data.prize_description}
          onChange={(e) => onUpdate({ prize_description: e.target.value })}
          error={!!errors.prize_description}
          helperText={errors.prize_description}
          variant="outlined"
        />
      </FieldContainer>

      <FieldContainer>
        <FieldLabel>
          <ImageIcon className="h-4 w-4 text-yellow-400" />
          URL de Imagen del Premio (Opcional)
        </FieldLabel>
        <StyledTextField
          fullWidth
          placeholder="https://ejemplo.com/imagen-premio.jpg"
          value={data.prize_image_url}
          onChange={(e) => onUpdate({ prize_image_url: e.target.value })}
          error={!!errors.prize_image_url}
          helperText={errors.prize_image_url}
          variant="outlined"
        />
      </FieldContainer>

      <FieldContainer>
        <FieldLabel>
          <DollarSign className="h-4 w-4 text-yellow-400" />
          Costo por Número
        </FieldLabel>
        <StyledTextField
          fullWidth
          type="number"
          placeholder="1000"
          value={data.number_cost || ''}
          onChange={(e) => onUpdate({ number_cost: parseFloat(e.target.value) || 0 })}
          error={!!errors.number_cost}
          helperText={errors.number_cost}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ color: '#ffd700', fontFamily: 'var(--font-orbitron), monospace' }}>
                  $
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <CostInfo>
          <CostInfoText>
            💡 <strong>Información importante:</strong><br/>
            • Cada rifa tiene 100 números disponibles (00-99)<br/>
            • El premio total será: ${(data.number_cost * 100).toLocaleString()}<br/>
            • Los participantes podrán comprar múltiples números
          </CostInfoText>
        </CostInfo>
      </FieldContainer>
    </StepContainer>
  )
}
