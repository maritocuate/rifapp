'use client'

import styled from '@emotion/styled'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import NumberGrid from '@/components/NumberGrid'
import NumberGridMobile from '@/components/NumberGridMobile'
import MainTitle from '@/components/MainTitle'
import {TotalPopup} from '@/components/TotalPopup'

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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set())

  const handleSelectionChange = (newSelection: Set<number>) => {
    setSelectedNumbers(newSelection)
  }

  const handleConfirmSelection = () => {
    alert(`Has seleccionado ${selectedNumbers.size} números por un total de $${selectedNumbers.size * 5}`)
  }

  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <MainTitle className="glow-text">Rifa Colonial Sape Divertida</MainTitle>
        {isMobile ? (
          <NumberGridMobile onSelectionChange={handleSelectionChange} />
        ) : (
          <NumberGrid onSelectionChange={handleSelectionChange} />
        )}
      </ContentWrapper>
      <TotalPopup 
        selectedCount={selectedNumbers.size} 
        onButtonClick={handleConfirmSelection}
      />
    </PageContainer>
  )
}

export default DynamicPageClient
