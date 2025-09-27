'use client'

import { useState } from 'react'
import { AuthModal } from '@/components/auth/AuthModal'
import { HeroSection } from './home/HeroSection'
import { FeaturesSection } from './home/FeaturesSection'
import { RafflesSection } from './home/RafflesSection'
import { PageContainer } from '@/components/HomePage.styles'




export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <PageContainer>
      <HeroSection onShowAuthModal={() => setShowAuthModal(true)} />
      <FeaturesSection />
      <RafflesSection />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
        redirectTo="/make"
      />
    </PageContainer>
  )
}
