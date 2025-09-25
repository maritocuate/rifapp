import { FormControlLabel, Typography } from '@mui/material'
import { TermsContainer, StyledCheckbox, TermsLink } from './styles'
import { TermsContainerProps } from './types'

export function TermsContainerComponent({ termsAccepted, onTermsChange, error }: TermsContainerProps) {
  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTermsChange(event.target.checked)
  }

  return (
    <TermsContainer>
      <FormControlLabel
        control={
          <StyledCheckbox
            checked={termsAccepted}
            onChange={handleTermsChange}
            name="termsAccepted"
          />
        }
        label={
          <Typography sx={{
            fontFamily: 'var(--font-orbitron), monospace',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4
          }}>
            Acepto los{' '}
            <TermsLink 
              href="/terminos" 
              target="_blank"
              sx={{ fontFamily: 'var(--font-orbitron), monospace' }}
            >
              términos y condiciones
            </TermsLink>
            {' '}para crear esta rifa
          </Typography>
        }
        sx={{ 
          alignItems: 'center',
          margin: 0,
          '& .MuiFormControlLabel-label': {
            marginLeft: '0.5rem'
          }
        }}
      />
      {error && (
        <Typography sx={{
          fontFamily: 'var(--font-orbitron), monospace',
          fontSize: '0.8rem',
          color: '#ff6b6b',
          marginTop: '0.5rem',
          marginLeft: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          ⚠️ {error}
        </Typography>
      )}
    </TermsContainer>
  )
}
