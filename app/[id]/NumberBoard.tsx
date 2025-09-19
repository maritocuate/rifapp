'use client'

import styled from '@emotion/styled'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import NumberGrid from '@/components/NumberGrid'
import NumberGridMobile from '@/components/NumberGridMobile'
import MainTitle from '@/components/MainTitle'
import EventDetails from '@/components/EventDetails'
import {TotalPopup} from './TotalPopup'
import { trpc } from '@/client/trpc'

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

interface NumberBoardProps {
  raffleId: string
}

const NumberBoard = ({ raffleId }: NumberBoardProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set())
  
  // Obtener datos de la rifa
  const { data: raffle, isLoading: isLoadingRaffle } = trpc.raffles.getById.useQuery({ id: raffleId })
  const { data: ticketStats, isLoading: isLoadingStats } = trpc.raffles.getTicketStats.useQuery({ raffleId })

  const handleSelectionChange = (newSelection: Set<number>) => {
    setSelectedNumbers(newSelection)
  }

  const handleConfirmSelection = () => {
    alert(`Has seleccionado ${selectedNumbers.size} números por un total de $${selectedNumbers.size * 5}`)
  }

  // Mostrar loading mientras se cargan los datos
  if (isLoadingRaffle || isLoadingStats) {
    return (
      <PageContainer className="geometric-bg">
        <ContentWrapper maxWidth="lg">
          <MainTitle className="glow-text">Cargando rifa...</MainTitle>
        </ContentWrapper>
      </PageContainer>
    )
  }

  // Mostrar error si no se encuentra la rifa
  if (!raffle) {
    return (
      <PageContainer className="geometric-bg">
        <ContentWrapper maxWidth="lg">
          <MainTitle className="glow-text">Rifa no encontrada</MainTitle>
        </ContentWrapper>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <MainTitle className="glow-text">{raffle.title}</MainTitle>
        
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
          description={raffle.description || "¡Participa en nuestra emocionante rifa! Un evento único donde podrás ganar increíbles premios mientras disfrutas de la mejor experiencia de entretenimiento. Cada número tiene la oportunidad de llevarse el gran premio."}
          prize={raffle.prize_description || "Premio especial"}
          authorNickname={raffle.profiles?.username || "Organizador"}
          authorAvatar=""
        />
      </ContentWrapper>
    </PageContainer>
  )
}

export default NumberBoard
