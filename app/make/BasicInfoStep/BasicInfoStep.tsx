'use client'

import { StepContainer } from './styles'
import { StepHeader } from './StepHeader'
import { TitleField } from './TitleField'
import { DescriptionField } from './DescriptionField'
import { BasicInfoStepProps } from './types'

export function BasicInfoStep({ data, onUpdate, errors }: BasicInfoStepProps) {
  const handleTitleChange = (value: string) => {
    onUpdate({ title: value })
  }

  const handleDescriptionChange = (value: string) => {
    onUpdate({ description: value })
  }

  return (
    <StepContainer>
      <StepHeader />
      
      <TitleField
        value={data.title}
        onChange={handleTitleChange}
        error={errors.title}
      />
      
      <DescriptionField
        value={data.description}
        onChange={handleDescriptionChange}
        error={errors.description}
      />
    </StepContainer>
  )
}
