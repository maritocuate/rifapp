'use client'

import { useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
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
  const [pendingPurchase, setPendingPurchase] = useState(false)
  const { user } = useAuth()
  
  // Obtener datos de la rifa
  const { data: raffle, isLoading: isLoadingRaffle } = trpc.raffles.getByAlias.useQuery({ alias: raffleAlias })
  const { data: ticketStats, isLoading: isLoadingStats } = trpc.raffles.getTicketStats.useQuery({ raffleId: raffle?.id || '' })
  const { data: soldNumbers, isLoading: isLoadingSoldNumbers } = trpc.raffles.getSoldNumbers.useQuery({ raffleId: raffle?.id || '' })
  const { data: userNumbers, isLoading: isLoadingUserNumbers } = trpc.raffles.getUserNumbers.useQuery(
    { raffleId: raffle?.id || '', userId: user?.id || '' },
    { enabled: !!user?.id && !!raffle?.id }
  )

  const purchaseNumbersMutation = trpc.raffles.purchaseNumbers.useMutation()

  const handleSelectionChange = (newSelection: Set<number>) => {
    setSelectedNumbers(newSelection)
  }

  const handleConfirmSelection = async () => {
    if (!user) {
      setPendingPurchase(true)
      setShowAuthModal(true)
      return
    }

    if (selectedNumbers.size === 0) {
      alert('Por favor selecciona al menos un número')
      return
    }

    if (!raffle) {
      alert('Error: No se pudo obtener información de la rifa')
      return
    }

    const numbersArray = Array.from(selectedNumbers)
    
    try {
      const preference = await purchaseNumbersMutation.mutateAsync({
        raffleId: raffle.id,
        numbers: numbersArray,
        buyerId: user.id,
        buyerEmail: user.email || '',
      })

      // Redirigir a MercadoPago
      if (preference.init_point) {
        window.location.href = preference.init_point
      }
    } catch (error) {
      console.error('Error al procesar compra:', error)
      alert(error instanceof Error ? error.message : 'Error al procesar la compra')
    }
  }

  // Función para manejar la compra después del login
  const handlePurchaseAfterLogin = useCallback(async () => {
    if (!user) return

    if (selectedNumbers.size === 0) {
      alert('Por favor selecciona al menos un número')
      return
    }

    if (!raffle) {
      alert('Error: No se pudo obtener información de la rifa')
      return
    }

    const numbersArray = Array.from(selectedNumbers)
    
    try {
      const preference = await purchaseNumbersMutation.mutateAsync({
        raffleId: raffle.id,
        numbers: numbersArray,
        buyerId: user.id,
        buyerEmail: user.email || '',
      })

      // Redirigir a MercadoPago
      if (preference.init_point) {
        window.location.href = preference.init_point
      }
    } catch (error) {
      console.error('Error al procesar compra:', error)
      alert(error instanceof Error ? error.message : 'Error al procesar la compra')
    }
  }, [user, selectedNumbers, raffle, purchaseNumbersMutation])

  // Efecto para manejar la compra después del login
  useEffect(() => {
    if (user && pendingPurchase) {
      setPendingPurchase(false)
      setShowAuthModal(false)
      handlePurchaseAfterLogin()
    }
  }, [user, pendingPurchase, handlePurchaseAfterLogin])

  // Función para cancelar la compra pendiente
  const handleCancelPendingPurchase = () => {
    setPendingPurchase(false)
    setShowAuthModal(false)
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
        onClose={handleCancelPendingPurchase}
        defaultMode="login"
        redirectTo={`/${raffleAlias}`}
      />
    </PageContainer>
  )
}

export default NumberBoardStep
