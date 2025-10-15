import { DollarSign } from 'lucide-react'
import { Typography } from '@mui/material'
import { FieldContainer, FieldLabel, CostInfo, CostInfoText, DetailsText } from './styles'
import { NumberCostFieldProps, CostInfoProps } from './types'
import { CostSlider } from './CostSlider'

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
      <CostSlider
        value={value || 1000}
        onChange={onChange}
        min={1000}
        max={100000}
        step={1000}
      />
      {error && (
        <Typography sx={{ 
          color: '#ff6b6b', 
          fontFamily: 'var(--font-orbitron), monospace',
          fontSize: '0.85rem',
          marginTop: '0.5rem'
        }}>
          {error}
        </Typography>
      )}
      <CostInfoComponent numberCost={value} />
    </FieldContainer>
  )
}
