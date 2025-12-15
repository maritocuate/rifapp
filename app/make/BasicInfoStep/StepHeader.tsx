import { Box, styled } from '@mui/material'
import { StepTitle, StepDescription } from './styles'

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
}))

export function StepHeader() {
  return (
    <StyledContainer>
      <StepTitle>Información Básica</StepTitle>
      <StepDescription>
        Comenzá definiendo el título y descripción de tu rifa
      </StepDescription>
    </StyledContainer>
  )
}
