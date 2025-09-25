export interface BasicInfoStepProps {
  data: {
    title: string
    description: string
  }
  onUpdate: (updates: { title?: string; description?: string }) => void
  errors: Record<string, string>
}

export interface FieldContainerProps {
  children: React.ReactNode
}

export interface FieldLabelProps {
  children: React.ReactNode
  icon: React.ReactNode
}

export interface StyledTextFieldProps {
  fullWidth?: boolean
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string | null
  variant?: 'outlined' | 'filled' | 'standard'
  inputProps?: { maxLength: number }
  multiline?: boolean
  rows?: number
}
