'use client'

import { useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import NumberGrid from '@/components/NumberGrid'
import NumberGridMobile from '@/components/NumberGridMobile'
import MainTitle from '@/components/MainTitle'
import EventDetails from '@/components/EventDetails'
import {TotalPopup} from '../TotalPopup'
import { trpc } from '@/client/trpc'
import { formatPrice } from '@/lib/utils'
import { PageContainer, ContentWrapper, GridSection } from './styles'
import { RaffleInfo } from './RaffleInfo'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { NumberBoardStepProps } from './types'

export function NumberBoardStep({ raffleId }: NumberBoardStepProps) {
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
    return <LoadingState />
  }

  // Mostrar error si no se encuentra la rifa
  if (!raffle) {
    return <ErrorState />
  }

  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <MainTitle className="glow-text">{raffle.title}</MainTitle>
        
        {/* Información de la rifa */}
        <RaffleInfo
          numberCost={raffle.number_cost || 0}
          username={raffle.profiles?.username || "Organizador"}
          availableNumbers={100 - (ticketStats?.soldNumbers || 0)}
        />
        
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
        />
      </ContentWrapper>
    </PageContainer>
  )
}

export default NumberBoardStep
