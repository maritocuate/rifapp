'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/client/trpc'
import { formatPrice } from '@/lib/utils'
import { 
  PageContainer, 
  ContentWrapper, 
  HeaderContainer, 
  LoginButtonWrapper 
} from '../[id]/NumberBoardStep/styles'
import { LoginButton } from '@/components/LoginButton'
import MainTitle from '@/components/MainTitle'
import { UserInfo } from './components/UserInfo'
import { UserRaffles } from './components/UserRaffles'
import { UserPurchases } from './components/UserPurchases'
import { LoadingState } from './components/LoadingState'
import { ErrorState } from './components/ErrorState'

interface ProfilePageProps {
  userId: string
  userEmail: string
}

export function ProfilePage({ userId, userEmail }: ProfilePageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'raffles' | 'purchases'>('raffles')

  // Obtener datos del usuario
  const { data: userRaffles, isLoading: isLoadingRaffles, error: rafflesError } = trpc.raffles.getUserRaffles.useQuery({ author_id: userId })
  const { data: userPurchases, isLoading: isLoadingPurchases, error: purchasesError } = trpc.raffles.getUserPurchasedNumbers.useQuery({ userId })

  const handleRaffleClick = (alias: string) => {
    router.push(`/${alias}`)
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
        <HeaderContainer>
          <LoginButtonWrapper>
            <LoginButton onShowAuthModal={() => {}} />
          </LoginButtonWrapper>
          
          <MainTitle className="glow-text">Mi Perfil</MainTitle>
        </HeaderContainer>

        <UserInfo email={userEmail} />

        <div className="mt-8 mb-6">
          <div className="flex space-x-1 bg-black/20 p-1 rounded-lg border border-yellow-400/20">
            <button
              onClick={() => setActiveTab('raffles')}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all duration-200 ${
                activeTab === 'raffles'
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10'
              }`}
            >
              Mis Rifas ({userRaffles?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all duration-200 ${
                activeTab === 'purchases'
                  ? 'bg-yellow-400 text-black font-bold'
                  : 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10'
              }`}
            >
              Mis Compras ({userPurchases?.length || 0})
            </button>
          </div>
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
      </ContentWrapper>
    </PageContainer>
  )
}
