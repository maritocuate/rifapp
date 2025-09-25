import { DollarSign } from 'lucide-react'
import { InputAdornment, Typography } from '@mui/material'
import { FieldContainer, FieldLabel, StyledTextField, CostInfo, CostInfoText, DetailsText } from './styles'
import { NumberCostFieldProps, CostInfoProps } from './types'

function CostInfoComponent({ numberCost }: CostInfoProps) {
  const comision = 0.05
  const gananciaNeta = numberCost * 100 * (1 - comision)

  return (
    <>
      <CostInfo>
        <CostInfoText>
          💡 <strong>Información importante:</strong><br/>
          • Cada rifa tiene 100 números disponibles (01-100)<br/>
          • Los participantes podrán comprar hasta 10 números<br/>
          • Tu ganancia neta será de: <strong className="text-yellow-400">${gananciaNeta.toLocaleString()}</strong>*<br/>
        </CostInfoText>
      </CostInfo>
      <DetailsText>* {comision * 100}% de comisión.</DetailsText>
    </>
  )
}

export function NumberCostField({ value, onChange, error }: NumberCostFieldProps) {
  return (
    <FieldContainer>
      <FieldLabel>
        <DollarSign className="h-4 w-4 text-yellow-400" />
        Costo por Número
      </FieldLabel>
      <StyledTextField
        fullWidth
        type="number"
        placeholder="1000"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        error={!!error}
        helperText={error}
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
      <CostInfoComponent numberCost={value} />
    </FieldContainer>
  )
}
