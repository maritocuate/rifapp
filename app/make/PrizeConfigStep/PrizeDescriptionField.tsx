import { Gift, AlertTriangle } from 'lucide-react'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'
import { FieldContainer, FieldLabel, StyledTextField, ProfanityAlert } from './styles'
import { PrizeDescriptionFieldProps } from './types'

export function PrizeDescriptionField({ value, onChange, error }: PrizeDescriptionFieldProps) {
  const prizeValidation = validateField(value, 'prize_description')

  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error || !prizeValidation.isValid}
        helperText={
          error || 
          prizeValidation.errors[0] ||
          `${prizeValidation.characterLimit.currentLength}/${prizeValidation.characterLimit.maxLength} caracteres`
        }
        variant="outlined"
        inputProps={{ maxLength: CHARACTER_LIMITS.prize_description.max }}
      />
      {prizeValidation.profanity.hasProfanity && (
        <ProfanityAlert severity="warning">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle className="h-4 w-4" />
            <span>
              Se detectaron palabras inapropiadas: {prizeValidation.profanity.detectedWords.join(', ')}
            </span>
          </div>
        </ProfanityAlert>
      )}
    </FieldContainer>
  )
}
