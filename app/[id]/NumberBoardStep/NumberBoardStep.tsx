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
import { PageContainer, ContentWrapper, GridSection, LoginButtonWrapper, HeaderContainer } from './styles'
import { RaffleInfo } from './RaffleInfo'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { NumberBoardStepProps } from './types'
import { useAuth } from '@/contexts/AuthContext'
import { LoginButton } from '@/components/LoginButton'
import { AuthModal } from '@/components/auth/AuthModal'

export function NumberBoardStep({ raffleAlias }: NumberBoardStepProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set())
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user } = useAuth()
  
  // Obtener datos de la rifa
  const { data: raffle, isLoading: isLoadingRaffle } = trpc.raffles.getByAlias.useQuery({ alias: raffleAlias })
  const { data: ticketStats, isLoading: isLoadingStats } = trpc.raffles.getTicketStats.useQuery({ raffleId: raffle?.id || '' })
  const { data: soldNumbers, isLoading: isLoadingSoldNumbers } = trpc.raffles.getSoldNumbers.useQuery({ raffleId: raffle?.id || '' })
  const { data: userNumbers, isLoading: isLoadingUserNumbers } = trpc.raffles.getUserNumbers.useQuery(
    { raffleId: raffle?.id || '', userId: user?.id || '' },
    { enabled: !!user?.id && !!raffle?.id }
  )

  const handleSelectionChange = (newSelection: Set<number>) => {
    setSelectedNumbers(newSelection)
  }

  const handleConfirmSelection = () => {
    const totalCost = selectedNumbers.size * (raffle.number_cost || 0)
    alert(`Has seleccionado ${selectedNumbers.size} números por un total de $${formatPrice(totalCost)}`)
  }

  // Mostrar loading mientras se cargan los datos
  if (isLoadingRaffle || isLoadingStats || isLoadingSoldNumbers || isLoadingUserNumbers) {
    return <LoadingState />
  }

  // Mostrar error si no se encuentra la rifa
  if (!raffle) {
    return <ErrorState />
  }

  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <HeaderContainer>
          <LoginButtonWrapper>
            <LoginButton onShowAuthModal={() => setShowAuthModal(true)} />
          </LoginButtonWrapper>
          
          <MainTitle className="glow-text">{raffle.title}</MainTitle>
        </HeaderContainer>
        
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
              userNumbers={userNumbers || []}
              prizeImageUrl={raffle.prize_image_url}
            />
          ) : (
            <NumberGrid 
              onSelectionChange={handleSelectionChange} 
              soldNumbers={soldNumbers || []} 
              userNumbers={userNumbers || []}
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

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
        redirectTo={`/${raffleAlias}`}
      />
    </PageContainer>
  )
}

export default NumberBoardStep
