import { SliderContainer, StyledSlider, SliderValueDisplay, SliderValueText } from './styles'

interface CostSliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export function CostSlider({ 
  value, 
  onChange, 
  min = 1000, 
  max = 100000, 
  step = 1000 
}: CostSliderProps) {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number)
  }

  return (
    <SliderContainer>
      <SliderValueDisplay>
        <SliderValueText>
          ${value.toLocaleString()}
        </SliderValueText>
      </SliderValueDisplay>
      <StyledSlider
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
      />
    </SliderContainer>
  )
}
