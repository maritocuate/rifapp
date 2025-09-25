export interface PrizeConfigStepProps {
  data: {
    prize_description: string
    prize_image_url: string
    number_cost: number
  }
  onUpdate: (updates: { 
    prize_description?: string
    prize_image_url?: string
    number_cost?: number
  }) => void
  errors: Record<string, string>
}

export interface PrizeDescriptionFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export interface ImageUrlFieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export interface NumberCostFieldProps {
  value: number
  onChange: (value: number) => void
  error?: string
}

export interface CostInfoProps {
  numberCost: number
}
