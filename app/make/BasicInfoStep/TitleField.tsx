import { User } from 'lucide-react'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'
import { FieldContainer, FieldLabel, StyledTextField } from './styles'

interface TitleFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function TitleField({ value, onChange, error }: TitleFieldProps) {
  const titleValidation = validateField(value, 'title')

  return (
    <FieldContainer>
      <FieldLabel>
        <User className="h-4 w-4 text-yellow-400" />
        Título de la Rifa
      </FieldLabel>
      <StyledTextField
        fullWidth
        placeholder="Ej: Rifa iPhone 15 Pro Max"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error || !titleValidation.isValid}
        helperText={
          error || 
          (titleValidation.profanity.hasProfanity ? `Se detectaron palabras inapropiadas: ${titleValidation.profanity.detectedWords.join(', ')}` : null) ||
          (titleValidation.errors.length > 0 && !titleValidation.profanity.hasProfanity ? titleValidation.errors[0] : null) ||
          (!titleValidation.profanity.hasProfanity ? `${titleValidation.characterLimit.currentLength}/${titleValidation.characterLimit.maxLength} caracteres` : null)
        }
        variant="outlined"
        inputProps={{ maxLength: CHARACTER_LIMITS.title.max }}
      />
    </FieldContainer>
  )
}
