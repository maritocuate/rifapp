'use client'

import { trpc } from '@/client/trpc'
import { useRouter } from 'next/navigation'
import { Typography, Skeleton } from '@mui/material'
import { 
  ListSection, 
  ListTitle, 
  ListItem, 
  RifaName, 
  RifaStats, 
  SkeletonItem,
  RifaNameContainer
} from './styles'

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Hace menos de 1h'
  if (diffInHours < 24) return `Hace ${diffInHours}h`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) return 'Hace 1d'
  return `Hace ${diffInDays}d`
}

const formatStats = (soldNumbers: number, totalNumbers: number) => {
  return `${soldNumbers}/${totalNumbers}`
}

const isRaffleFinished = (raffle: any) => {
  // Una rifa está finalizada solo cuando se vendieron todos los números (100)
  if (raffle.soldNumbers !== undefined && raffle.totalNumbers !== undefined) {
    return raffle.soldNumbers >= raffle.totalNumbers
  }
  
  return false
}

interface RafflesListProps {
  type: 'recent' | 'almostFinished'
  title: string
}

export function RafflesList({ type, title }: RafflesListProps) {
  const router = useRouter()
  const { data: recentRaffles, isLoading: isLoadingRecent } = trpc.raffles.getAll.useQuery()
  const { data: almostFinishedRaffles, isLoading: isLoadingAlmostFinished } = trpc.raffles.getAlmostFinished.useQuery()

  const raffles = type === 'recent' ? recentRaffles : almostFinishedRaffles
  const isLoading = type === 'recent' ? isLoadingRecent : isLoadingAlmostFinished

  const handleRaffleClick = (raffleAlias: string) => {
    router.push(`/${raffleAlias}`)
  }

  if (isLoading) {
    return (
      <ListSection>
        <ListTitle>{title}</ListTitle>
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonItem key={index}>
            <Skeleton 
              variant="text" 
              width="70%" 
              height={20}
              sx={{ 
                bgcolor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: '4px'
              }} 
            />
            <Skeleton 
              variant="text" 
              width="20%" 
              height={16}
              sx={{ 
                bgcolor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: '4px'
              }} 
            />
          </SkeletonItem>
        ))}
      </ListSection>
    )
  }

  if (!raffles || raffles.length === 0) {
    return (
      <ListSection>
        <ListTitle>{title}</ListTitle>
        <Typography 
          sx={{ 
            color: '#ffffff', 
            textAlign: 'center', 
            fontFamily: 'var(--font-orbitron), monospace',
            opacity: 0.7
          }}
        >
          No hay rifas disponibles
        </Typography>
      </ListSection>
    )
  }

  return (
    <ListSection>
      <ListTitle>{title}</ListTitle>
      {raffles.slice(0, 7).map((raffle) => (
        <ListItem 
          key={raffle.id}
          onClick={() => handleRaffleClick(raffle.alias)}
        >
          <RifaNameContainer>
            {isRaffleFinished(raffle) && <span style={{ fontSize: '14px', marginRight: '4px' }}>🎉</span>}
            <RifaName>{raffle.title}</RifaName>
          </RifaNameContainer>
          <RifaStats>
            {type === 'recent' 
              ? formatTimeAgo(raffle.created_at)
              : formatStats(raffle.soldNumbers || 0, raffle.totalNumbers || 100)
            }
          </RifaStats>
        </ListItem>
      ))}
    </ListSection>
  )
}
