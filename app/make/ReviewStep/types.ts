export interface ReviewStepProps {
  data: {
    title: string
    description: string
    prize_description: string
    prize_image_url: string
    number_cost: number
  }
  errors: Record<string, string>
  onTermsAccepted?: (accepted: boolean) => void
  onCaptchaVerified?: (verified: boolean) => void
}

export interface ReviewCardProps {
  children: React.ReactNode
}

export interface SectionTitleProps {
  children: React.ReactNode
  icon: React.ReactNode
}

export interface InfoRowProps {
  label: string
  value: string | React.ReactNode
}

export interface SummaryBoxProps {
  numberCost: number
}

export interface TermsContainerProps {
  termsAccepted: boolean
  onTermsChange: (accepted: boolean) => void
  error?: string
}
