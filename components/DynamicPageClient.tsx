'use client'

import styled from '@emotion/styled'
import { Box, Container } from '@mui/material'
import NumberGrid from '@/components/NumberGrid'

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
  textAlign: 'center',
}))

const DynamicPageClient = () => {
  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <NumberGrid />
      </ContentWrapper>
    </PageContainer>
  )
}

export default DynamicPageClient
