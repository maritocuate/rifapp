import { FileText } from 'lucide-react'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'
import { FieldContainer, FieldLabel, StyledTextField } from './styles'

interface DescriptionFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function DescriptionField({ value, onChange, error }: DescriptionFieldProps) {
  const descriptionValidation = validateField(value, 'description')
  
  const shouldShowError = !!error || (value.trim().length > 0 && !descriptionValidation.isValid)
  const shouldShowHelperText = error || 
    (value.trim().length > 0 && descriptionValidation.profanity.hasProfanity ? `Se detectaron palabras inapropiadas: ${descriptionValidation.profanity.detectedWords.join(', ')}` : null) ||
    (value.trim().length > 0 && descriptionValidation.errors.length > 0 && !descriptionValidation.profanity.hasProfanity ? descriptionValidation.errors[0] : null)

  return (
    <FieldContainer>
      <FieldLabel>
        <FileText className="h-4 w-4 text-yellow-400" />
        Descripción
      </FieldLabel>
      <StyledTextField
        fullWidth
        multiline
        rows={4}
        placeholder="Describe tu rifa, incluye detalles importantes, reglas, etc..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={shouldShowError}
        helperText={shouldShowHelperText}
        variant="outlined"
        autoComplete="off"
        inputProps={{ maxLength: CHARACTER_LIMITS.description.max }}
      />
    </FieldContainer>
  )
}
