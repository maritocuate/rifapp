'use client'

import styled from '@emotion/styled'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import NumberGrid from '@/components/NumberGrid'
import NumberGridMobile from '@/components/NumberGridMobile'
import MainTitle from '@/components/MainTitle'
import EventDetails from '@/components/EventDetails'
import {TotalPopup} from './TotalPopup'

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
  maxWidth: '1200px',
  textAlign: 'center',
}))

const GridSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '2rem',
  
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
}))

const NumberBoard = () => {
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
        
        <GridSection>
          {isMobile ? (
            <NumberGridMobile onSelectionChange={handleSelectionChange} />
          ) : (
            <NumberGrid onSelectionChange={handleSelectionChange} />
          )}
          <TotalPopup 
            selectedCount={selectedNumbers.size} 
            onButtonClick={handleConfirmSelection}
          />
        </GridSection>
        
        <EventDetails
          description="¡Participa en nuestra emocionante rifa colonial! Un evento único donde podrás ganar increíbles premios mientras disfrutas de la mejor experiencia de entretenimiento. Cada número tiene la oportunidad de llevarse el gran premio."
          prize="$10,000 USD + Cena para 2 personas en el mejor restaurante de la ciudad"
          authorNickname="CasinoMaster"
          authorAvatar=""
        />
      </ContentWrapper>
    </PageContainer>
  )
}

export default NumberBoard
