'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, Card, CardContent, Divider } from '@mui/material'
import { User, FileText, Gift, DollarSign, Image as ImageIcon, CheckCircle } from 'lucide-react'

const StepContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '1rem 0',
}))

const StepTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#ffd700',
  textAlign: 'center',
  marginBottom: '1rem',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  marginBottom: '2rem',
  lineHeight: 1.6,
}))

const ReviewCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)',
}))

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: '1.5rem',
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.2rem',
  fontWeight: 600,
  color: '#ffd700',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}))

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  marginBottom: '1rem',
}))

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.7)',
}))

const InfoValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  lineHeight: 1.4,
}))

const HighlightValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#ffd700',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

const SummaryBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '1rem',
}))

const SummaryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#ffd700',
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}))

const SummaryText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  lineHeight: 1.5,
}))

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'rgba(255, 215, 0, 0.2)',
  margin: '1rem 0',
}))

interface ReviewStepProps {
  data: {
    title: string
    description: string
    prize_description: string
    prize_image_url: string
    number_cost: number
  }
  errors: Record<string, string>
}

export function ReviewStep({ data, errors }: ReviewStepProps) {
  const totalPrize = data.number_cost * 100

  return (
    <StepContainer>
      <StepTitle>Revisión Final</StepTitle>
      <StepDescription>
        Revisá todos los detalles antes de crear tu rifa
      </StepDescription>

      <ReviewCard>
        <CardContentStyled>
          <SectionTitle>
            <User className="h-5 w-5" />
            Información Básica
          </SectionTitle>
          
          <InfoRow>
            <InfoLabel>Título</InfoLabel>
            <InfoValue>{data.title}</InfoValue>
          </InfoRow>

          {data.description && (
            <InfoRow>
              <InfoLabel>Descripción</InfoLabel>
              <InfoValue>{data.description}</InfoValue>
            </InfoRow>
          )}

          <StyledDivider />

          <SectionTitle>
            <Gift className="h-5 w-5" />
            Configuración del Premio
          </SectionTitle>

          <InfoRow>
            <InfoLabel>Descripción del Premio</InfoLabel>
            <InfoValue>{data.prize_description}</InfoValue>
          </InfoRow>

          {data.prize_image_url && (
            <InfoRow>
              <InfoLabel>Imagen del Premio</InfoLabel>
              <InfoValue sx={{ 
                color: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ImageIcon className="h-4 w-4" />
                URL proporcionada
              </InfoValue>
            </InfoRow>
          )}

          <InfoRow>
            <InfoLabel>Costo por Número</InfoLabel>
            <HighlightValue>${data.number_cost.toLocaleString()}</HighlightValue>
          </InfoRow>

          <SummaryBox>
            <SummaryTitle>
              <CheckCircle className="h-4 w-4" />
              Resumen de la Rifa
            </SummaryTitle>
            <SummaryText>
              • <strong>100 números</strong> disponibles (00-99)<br/>
              • <strong>${data.number_cost.toLocaleString()}</strong> por número<br/>
              • <strong>Premio total:</strong> ${totalPrize.toLocaleString()}<br/>
              • <strong>Estado:</strong> Activa (lista para recibir participantes)
            </SummaryText>
          </SummaryBox>
        </CardContentStyled>
      </ReviewCard>
    </StepContainer>
  )
}
