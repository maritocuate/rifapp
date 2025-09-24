'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, TextField, Alert } from '@mui/material'
import { User, FileText, AlertTriangle } from 'lucide-react'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'

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
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: '1.5rem',
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

interface BasicInfoStepProps {
  data: {
    title: string
    description: string
  }
  onUpdate: (updates: { title?: string; description?: string }) => void
  errors: Record<string, string>
}

export function BasicInfoStep({ data, onUpdate, errors }: BasicInfoStepProps) {
  // Validación optimizada en tiempo real
  const titleValidation = validateField(data.title, 'title')
  const descriptionValidation = validateField(data.description, 'description')

  const handleTitleChange = (value: string) => {
    onUpdate({ title: value })
  }

  const handleDescriptionChange = (value: string) => {
    onUpdate({ description: value })
  }

  return (
    <StepContainer>
      <StepTitle>Información Básica</StepTitle>
      <StepDescription>
        Comenzá definiendo el título y descripción de tu rifa
      </StepDescription>

      <FieldContainer>
        <FieldLabel>
          <User className="h-4 w-4 text-yellow-400" />
          Título de la Rifa
        </FieldLabel>
        <StyledTextField
          fullWidth
          placeholder="Ej: Rifa iPhone 15 Pro Max"
          value={data.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          error={!!errors.title || !titleValidation.isValid}
          helperText={
            errors.title || 
            (titleValidation.profanity.hasProfanity ? `Se detectaron palabras inapropiadas: ${titleValidation.profanity.detectedWords.join(', ')}` : null) ||
            (titleValidation.errors.length > 0 && !titleValidation.profanity.hasProfanity ? titleValidation.errors[0] : null) ||
            (!titleValidation.profanity.hasProfanity ? `${titleValidation.characterLimit.currentLength}/${titleValidation.characterLimit.maxLength} caracteres` : null)
          }
          variant="outlined"
          inputProps={{ maxLength: CHARACTER_LIMITS.title.max }}
        />
      </FieldContainer>

      <FieldContainer>
        <FieldLabel>
          <FileText className="h-4 w-4 text-yellow-400" />
          Descripción (Opcional)
        </FieldLabel>
        <StyledTextField
          fullWidth
          multiline
          rows={4}
          placeholder="Describe tu rifa, incluye detalles importantes, reglas, etc..."
          value={data.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          error={!!errors.description || !descriptionValidation.isValid}
          helperText={
            errors.description || 
            (descriptionValidation.profanity.hasProfanity ? `Se detectaron palabras inapropiadas: ${descriptionValidation.profanity.detectedWords.join(', ')}` : null) ||
            (descriptionValidation.errors.length > 0 && !descriptionValidation.profanity.hasProfanity ? descriptionValidation.errors[0] : null) ||
            (!descriptionValidation.profanity.hasProfanity ? `${descriptionValidation.characterLimit.currentLength}/${descriptionValidation.characterLimit.maxLength} caracteres` : null)
          }
          variant="outlined"
          inputProps={{ maxLength: CHARACTER_LIMITS.description.max }}
        />
      </FieldContainer>
    </StepContainer>
  )
}
