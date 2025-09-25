'use client'

import { trpc } from '@/client/trpc'
import { styled } from '@mui/material/styles'
import { Box, Typography, Skeleton } from '@mui/material'
import { useRouter } from 'next/navigation'

const ListSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.03))',
  borderRadius: '15px',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  padding: '1.5rem',
  backdropFilter: 'blur(10px)',
}))

const ListTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 600,
  fontSize: '1.3rem',
  color: '#ffd700',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
  marginBottom: '1.5rem',
  textAlign: 'center',
}))

const ListItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 0',
  borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  
  '&:last-child': {
    borderBottom: 'none',
  },
  
  '&:hover': {
    background: 'rgba(255, 215, 0, 0.1)',
    borderRadius: '8px',
    padding: '0.75rem',
    margin: '0 -0.75rem',
    transform: 'translateX(4px)',
    boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
  },
}))

const RifaName = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: '#ffffff',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  flex: 1,
  marginRight: '1rem',
}))

const RifaStats = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.8rem',
  color: '#ffd700',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
  fontWeight: 600,
}))

const SkeletonItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 0',
  borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
  
  '&:last-child': {
    borderBottom: 'none',
  },
}))

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
          <RifaName>{raffle.title}</RifaName>
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
