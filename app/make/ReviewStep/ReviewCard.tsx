import { User, Gift } from 'lucide-react'
import Image from 'next/image'
import { ReviewCard as StyledReviewCard, CardContentStyled, SectionTitle, InfoRow, InfoLabel, InfoValue, HighlightValue, SummaryBox, SummaryTitle, SummaryText, StyledDivider } from './styles'
import { ReviewCardProps } from './types'

interface ReviewCardComponentProps {
  data: {
    title: string
    description: string
    prize_description: string
    prize_image_url: string
    number_cost: number
  }
}

export function ReviewCardComponent({ data }: ReviewCardComponentProps) {
  const totalPrize = data.number_cost * 100

  return (
    <StyledReviewCard>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0'
            }}>
              <Image 
                src={data.prize_image_url} 
                alt="Imagen del premio" 
                width={130}
                height={80}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)'
                }}
              />
            </InfoValue>
          </InfoRow>
        )}

        <InfoRow>
          <InfoLabel>Costo por Número</InfoLabel>
          <HighlightValue>${data.number_cost.toLocaleString()}</HighlightValue>
        </InfoRow>

        <SummaryBox>
          <SummaryTitle>
            Resumen de la Rifa
          </SummaryTitle>
          <SummaryText>
            • <strong>100 números</strong> disponibles (01-100)<br/>
            • <strong>${data.number_cost.toLocaleString()}</strong> por número<br/>
            • <strong>Premio total:</strong> ${totalPrize.toLocaleString()}<br/>
            • <strong>Estado:</strong> Activa (lista para recibir participantes)
          </SummaryText>
        </SummaryBox>
      </CardContentStyled>
    </StyledReviewCard>
  )
}
