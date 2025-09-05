'use client'

import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import CasinoLogo from '@/components/CasinoLogo'
import CasinoTitle from '@/components/CasinoTitle'
import NumberGrid from '@/components/NumberGrid'

const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: '2rem 0',
  position: 'relative',
}))

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
}))

const FloatingElement = styled(Box)<{ top: string; left: string; delay: string }>(
  ({ top, left, delay }) => ({
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
    borderRadius: '50%',
    top,
    left,
    animation: `float 6s ease-in-out infinite ${delay}`,
    opacity: 0.6,

    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
  })
)

export default function Home() {
  return (
    <PageContainer className="geometric-bg">
      {/* Floating decorative elements */}
      <FloatingElement top="10%" left="10%" delay="0s" />
      <FloatingElement top="20%" left="85%" delay="1s" />
      <FloatingElement top="60%" left="5%" delay="2s" />
      <FloatingElement top="70%" left="90%" delay="3s" />
      <FloatingElement top="30%" left="95%" delay="1.5s" />
      <FloatingElement top="80%" left="15%" delay="2.5s" />

      <ContentWrapper maxWidth="lg">
        <CasinoLogo />
        <CasinoTitle />
        <NumberGrid />
      </ContentWrapper>
    </PageContainer>
  )
}
