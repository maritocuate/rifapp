'use client'

import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import SoonTitle from '@/components/SoonTitle'

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '2rem 0',
  position: 'relative',
}))

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
}))

export default function Soon() {
  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <SoonTitle />
      </ContentWrapper>
    </PageContainer>
  )
}
