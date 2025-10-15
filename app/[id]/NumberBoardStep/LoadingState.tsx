'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { PageContainer, ContentWrapper } from './styles'

export function LoadingState() {
  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <LoadingSpinner 
          message="Cargando rifa..." 
          size="lg" 
          fullScreen 
        />
      </ContentWrapper>
    </PageContainer>
  )
}
