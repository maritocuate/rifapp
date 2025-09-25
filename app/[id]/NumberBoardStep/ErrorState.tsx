'use client'

import MainTitle from '@/components/MainTitle'
import { PageContainer, ContentWrapper } from './styles'

export function ErrorState() {
  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <MainTitle className="glow-text">Rifa no encontrada</MainTitle>
      </ContentWrapper>
    </PageContainer>
  )
}
