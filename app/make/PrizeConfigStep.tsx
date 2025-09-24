'use client'

import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, InputAdornment, Alert } from '@mui/material'
import { Gift, DollarSign, Image as ImageIcon, AlertTriangle } from 'lucide-react'
import { useProfanityFilter, CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'

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

const DetailsText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.6rem',
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
  // Validación optimizada en tiempo real
  const prizeValidation = validateField(data.prize_description, 'prize_description')
  const imageUrlValidation = validateField(data.prize_image_url, 'prize_image_url')
  
  const comision = 0.05
  const gananciaNeta = data.number_cost * 100 * (1 - comision)

  const handlePrizeDescriptionChange = (value: string) => {
    onUpdate({ prize_description: value })
  }

  const handleImageUrlChange = (value: string) => {
    onUpdate({ prize_image_url: value })
  }
  
  return (
    <StepContainer>
      <StepTitle>Configuración del Sorteo</StepTitle>

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
          onChange={(e) => handlePrizeDescriptionChange(e.target.value)}
          error={!!errors.prize_description || !prizeValidation.isValid}
          helperText={
            errors.prize_description || 
            prizeValidation.errors[0] ||
            `${prizeValidation.characterLimit.currentLength}/${prizeValidation.characterLimit.maxLength} caracteres`
          }
          variant="outlined"
          inputProps={{ maxLength: CHARACTER_LIMITS.prize_description.max }}
        />
        {prizeValidation.profanity.hasProfanity && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlertTriangle className="h-4 w-4" />
              <Typography variant="body2">
                Se detectaron palabras inapropiadas: {prizeValidation.profanity.detectedWords.join(', ')}
              </Typography>
            </Box>
          </Alert>
        )}
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
          onChange={(e) => handleImageUrlChange(e.target.value)}
          error={!!errors.prize_image_url || !imageUrlValidation.isValid}
          helperText={
            errors.prize_image_url || 
            imageUrlValidation.errors[0] ||
            `${imageUrlValidation.characterLimit.currentLength}/${imageUrlValidation.characterLimit.maxLength} caracteres`
          }
          variant="outlined"
          inputProps={{ maxLength: CHARACTER_LIMITS.prize_image_url.max }}
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
            • Cada rifa tiene 100 números disponibles (01-100)<br/>
            • Los participantes podrán comprar hasta 10 números<br/>
            • Tu ganancia neta será de: <strong className="text-yellow-400">${gananciaNeta.toLocaleString()}</strong>*<br/>
          </CostInfoText>
        </CostInfo>
        <DetailsText>* {comision * 100}% de comisión.</DetailsText>
      </FieldContainer>
    </StepContainer>
  )
}
