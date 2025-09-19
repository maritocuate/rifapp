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
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

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

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3rem 0',
  marginBottom: '1rem',
  position: 'relative',
  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.2)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.1))',
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
  const { data: soldNumbers, isLoading: isLoadingSoldNumbers } = trpc.raffles.getSoldNumbers.useQuery({ raffleId })

  const handleSelectionChange = (newSelection: Set<number>) => {
    setSelectedNumbers(newSelection)
  }

  const handleConfirmSelection = () => {
    const totalCost = selectedNumbers.size * (raffle.number_cost || 0)
    alert(`Has seleccionado ${selectedNumbers.size} números por un total de $${formatPrice(totalCost)}`)
  }

  // Mostrar loading mientras se cargan los datos
  if (isLoadingRaffle || isLoadingStats || isLoadingSoldNumbers) {
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
        
        {/* Información de la rifa */}
        <Box sx={{ 
          margin: '1.5rem 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: { xs: '0.5rem', md: '1rem' },
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.8)',
          textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: '#FFD700',
            fontWeight: '500',
          }}>
            💰 ${formatPrice(raffle.number_cost || 0)} por número
          </Box>
          
          <Box sx={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1.2rem',
            display: { xs: 'none', md: 'block' },
          }}>
            |
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
          }}>
            👤 {raffle.profiles?.username || "Organizador"}
          </Box>
          
          <Box sx={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1.2rem',
            display: { xs: 'none', md: 'block' },
          }}>
            |
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
          }}>
            🎫 {ticketStats?.soldNumbers || 0} números vendidos
          </Box>
        </Box>
        
        <GridSection>
          {isMobile ? (
            <NumberGridMobile 
              onSelectionChange={handleSelectionChange} 
              soldNumbers={soldNumbers || []} 
              prizeImageUrl={raffle.prize_image_url}
            />
          ) : (
            <NumberGrid 
              onSelectionChange={handleSelectionChange} 
              soldNumbers={soldNumbers || []} 
              prizeImageUrl={raffle.prize_image_url}
            />
          )}
          <TotalPopup 
            selectedCount={selectedNumbers.size} 
            numberCost={raffle.number_cost || 0}
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
