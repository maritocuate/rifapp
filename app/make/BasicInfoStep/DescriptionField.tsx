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

  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error || !descriptionValidation.isValid}
        helperText={
          error || 
          (descriptionValidation.profanity.hasProfanity ? `Se detectaron palabras inapropiadas: ${descriptionValidation.profanity.detectedWords.join(', ')}` : null) ||
          (descriptionValidation.errors.length > 0 && !descriptionValidation.profanity.hasProfanity ? descriptionValidation.errors[0] : null) ||
          (!descriptionValidation.profanity.hasProfanity ? `${descriptionValidation.characterLimit.currentLength}/${descriptionValidation.characterLimit.maxLength} caracteres` : null)
        }
        variant="outlined"
        inputProps={{ maxLength: CHARACTER_LIMITS.description.max }}
      />
    </FieldContainer>
  )
}
