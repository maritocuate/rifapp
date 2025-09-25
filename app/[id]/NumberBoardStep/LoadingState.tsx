'use client'

import Image from 'next/image'
import { PageContainer, ContentWrapper, LogoContainer } from './styles'

export function LoadingState() {
  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <LogoContainer>
          <Image
            src="/images/logo-md.png"
            alt="Riffita"
            width={400}
            height={120}
            priority
            style={{
              width: 'clamp(250px, 15vw, 400px)',
              height: 'auto',
              maxWidth: '100%',
            }}
          />
        </LogoContainer>
      </ContentWrapper>
    </PageContainer>
  )
}
