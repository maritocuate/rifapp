import { Gift, AlertTriangle } from 'lucide-react'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'
import { FieldContainer, FieldLabel, StyledTextField, ProfanityAlert } from './styles'
import { PrizeDescriptionFieldProps } from './types'

export function PrizeDescriptionField({ value, onChange, error }: PrizeDescriptionFieldProps) {
  const prizeValidation = validateField(value, 'prize_description')
  
  // Solo mostrar errores si hay un error explícito o si el campo tiene contenido y hay errores
  const shouldShowError = !!error || (value.trim().length > 0 && !prizeValidation.isValid)
  const shouldShowHelperText = error || 
    (value.trim().length > 0 && prizeValidation.errors.length > 0 ? prizeValidation.errors[0] : null)

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
        error={shouldShowError}
        helperText={shouldShowHelperText}
        variant="outlined"
        autoComplete="off"
        inputProps={{ maxLength: CHARACTER_LIMITS.prize_description.max }}
      />
      {value.trim().length > 0 && prizeValidation.profanity.hasProfanity && (
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
