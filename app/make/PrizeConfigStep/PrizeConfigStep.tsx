'use client'

import { StepContainer } from './styles'
import { PrizeDescriptionField } from './PrizeDescriptionField'
import { ImageUploadField } from './ImageUploadField'
import { NumberCostField } from './NumberCostField'
import { PrizeConfigStepProps } from './types'

export function PrizeConfigStep({ data, onUpdate, errors }: PrizeConfigStepProps) {
  const handlePrizeDescriptionChange = (value: string) => {
    onUpdate({ prize_description: value })
  }

  const handleImageUrlChange = (value: string) => {
    onUpdate({ prize_image_url: value })
  }

  const handleNumberCostChange = (value: number) => {
    onUpdate({ number_cost: value })
  }

  return (
    <StepContainer>
      <PrizeDescriptionField
        value={data.prize_description}
        onChange={handlePrizeDescriptionChange}
        error={errors.prize_description}
      />
      
      <ImageUploadField
        value={data.prize_image_url}
        onChange={handleImageUrlChange}
        error={errors.prize_image_url}
      />
      
      <NumberCostField
        value={data.number_cost}
        onChange={handleNumberCostChange}
        error={errors.number_cost}
      />
    </StepContainer>
  )
}
