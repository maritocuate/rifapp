'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { CreateRaffleWizard } from './CreateRaffleWizard'
import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '2rem 0',
  position: 'relative',
}))

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '800px',
  textAlign: 'center',
}))

export default function MakePage() {
  return (
    <ProtectedRoute>
      <PageContainer className="geometric-bg">
        <ContentWrapper maxWidth="lg">
          <CreateRaffleWizard />
        </ContentWrapper>
      </PageContainer>
    </ProtectedRoute>
  )
}
