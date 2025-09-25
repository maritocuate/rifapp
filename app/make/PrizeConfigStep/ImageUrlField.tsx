import { Image as ImageIcon } from 'lucide-react'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'
import { FieldContainer, FieldLabel, StyledTextField } from './styles'
import { ImageUrlFieldProps } from './types'

export function ImageUrlField({ value, onChange, error }: ImageUrlFieldProps) {
  const imageUrlValidation = validateField(value, 'prize_image_url')
  
  // Solo mostrar errores si hay un error explícito o si el campo tiene contenido y hay errores
  const shouldShowError = !!error || (value.trim().length > 0 && !imageUrlValidation.isValid)
  const shouldShowHelperText = error || 
    (value.trim().length > 0 && imageUrlValidation.errors.length > 0 ? imageUrlValidation.errors[0] : null)

  return (
    <FieldContainer>
      <FieldLabel>
        <ImageIcon className="h-4 w-4 text-yellow-400" />
        URL de Imagen del Premio (Opcional)
      </FieldLabel>
      <StyledTextField
        fullWidth
        placeholder="https://ejemplo.com/imagen-premio.jpg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={shouldShowError}
        helperText={shouldShowHelperText}
        variant="outlined"
        inputProps={{ maxLength: CHARACTER_LIMITS.prize_image_url.max }}
      />
    </FieldContainer>
  )
}
