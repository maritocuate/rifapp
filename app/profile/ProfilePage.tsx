'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/client/trpc'
import { useAuth } from '@/contexts/AuthContext'
import { 
  PageContainer, 
  ContentWrapper
} from '../[id]/NumberBoardStep/styles'
import SecondaryTitle from '@/components/SecondaryTitle'
import { UserInfo } from './components/UserInfo'
import { UserRaffles } from './components/UserRaffles'
import { UserPurchases } from './components/UserPurchases'
import { LoadingState } from './components/LoadingState'
import { ErrorState } from './components/ErrorState'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { HouseIcon, SignOutIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface ProfilePageProps {
  userId: string
  userEmail: string
  username?: string
}

const StyledHeaderContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.08), rgba(255, 215, 0, 0.03))',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
  width: '100%',
  marginTop: '-2rem',
  marginBottom: '2rem',
  position: 'relative',
}))

const HeaderContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
})

const CircularButton = styled(Button)({
  position: 'relative',
  padding: 0,
  height: '2.75rem',
  width: '2.75rem',
  borderRadius: '50%',
  border: '1px solid rgba(251, 191, 36, 0.3)',
  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
    boxShadow: '0 10px 25px rgba(251, 191, 36, 0.2)',
  },
})

const ContentContainer = styled('div')({
  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(55, 65, 81, 0.4))',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(251, 191, 36, 0.2)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
})

const TabsContainer = styled('div')({
  display: 'flex',
  borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
})

const TabButton = styled('button')<{ active: boolean }>(({ active }) => ({
  padding: '0.75rem 1.5rem',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  transition: 'all 0.2s ease',
  borderBottom: '2px solid',
  borderBottomColor: active ? '#fbbf24' : 'transparent',
  color: active ? '#fbbf24' : '#9ca3af',
  fontWeight: active ? 'bold' : 'normal',
  '&:hover': {
    color: '#fbbf24',
    borderBottomColor: active ? '#fbbf24' : 'rgba(251, 191, 36, 0.5)',
  },
}))

export function ProfilePage({ userId, userEmail, username }: ProfilePageProps) {
  const router = useRouter()
  const { signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<'raffles' | 'purchases'>('raffles')

  // Obtener datos del usuario
  const { data: userRaffles, isLoading: isLoadingRaffles, error: rafflesError } = trpc.raffles.getUserRaffles.useQuery({ author_id: userId })
  const { data: userPurchases, isLoading: isLoadingPurchases, error: purchasesError } = trpc.raffles.getUserPurchasedNumbers.useQuery({ userId })

  const handleRaffleClick = (alias: string) => {
    router.push(`/${alias}`)
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (isLoadingRaffles || isLoadingPurchases) {
    return <LoadingState />
  }

  if (rafflesError || purchasesError) {
    return <ErrorState />
  }

  return (
    <PageContainer className="geometric-bg">
      <ContentWrapper maxWidth="lg">
        <StyledHeaderContainer>
          <HeaderContent>
            <SecondaryTitle>Mi Perfil</SecondaryTitle>
            <ButtonContainer>
              <CircularButton
                onClick={handleGoHome}
                title="Volver al Home"
              >
                <HouseIcon className="h-4 w-4 text-yellow-400" />
              </CircularButton>
              <CircularButton
                onClick={handleSignOut}
                title="Desloguearse"
              >
                <SignOutIcon className="h-4 w-4 text-yellow-400" />
              </CircularButton>
            </ButtonContainer>
          </HeaderContent>
        </StyledHeaderContainer>

        <ContentContainer>
          <UserInfo email={userEmail} username={username} />

          <div className="mt-8 mb-6">
            <TabsContainer>
              <TabButton
                onClick={() => setActiveTab('raffles')}
                active={activeTab === 'raffles'}
              >
                Mis Rifas ({userRaffles?.length || 0})
              </TabButton>
              <TabButton
                onClick={() => setActiveTab('purchases')}
                active={activeTab === 'purchases'}
              >
                Mis Compras ({userPurchases?.length || 0})
              </TabButton>
            </TabsContainer>
          </div>

          {activeTab === 'raffles' ? (
            <UserRaffles 
              raffles={userRaffles || []} 
              onRaffleClick={handleRaffleClick}
            />
          ) : (
            <UserPurchases 
              purchases={userPurchases || []} 
              onRaffleClick={handleRaffleClick}
            />
          )}
        </ContentContainer>
      </ContentWrapper>
    </PageContainer>
  )
}
