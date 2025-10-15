'use client'

import { useState } from 'react'
import { AuthModal } from '@/components/auth/AuthModal'
import { HeroSection } from './home/HeroSection'
import { FeaturesSection } from './home/FeaturesSection'
import { RafflesSection } from './home/RafflesSection'
import { TestimonialsSection } from './home/TestimonialsSection'
import { PageContainer } from '@/components/HomePage.styles'
import { StructuredData } from '@/components/StructuredData'

export default function HomeClient() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <PageContainer>
      <StructuredData
        type="website"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Riffita',
          url: 'https://riffita.com',
          description:
            'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://riffita.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          mainEntity: {
            '@type': 'SoftwareApplication',
            name: 'Riffita',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          },
        }}
      />
      <HeroSection onShowAuthModal={() => setShowAuthModal(true)} />
      <FeaturesSection />
      <RafflesSection />
      <TestimonialsSection />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
        redirectTo="/make"
      />
    </PageContainer>
  )
}
