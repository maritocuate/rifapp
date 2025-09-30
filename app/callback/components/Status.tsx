'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Box, Container, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import MainTitle from '@/components/MainTitle'

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '1rem 0 2rem 0',
  position: 'relative',
}))

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  textAlign: 'center',
}))

const StatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  textAlign: 'center',
  padding: '2rem',
  background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.08), rgba(255, 215, 0, 0.03))',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 215, 0, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  margin: '2rem 0',
}))

const StatusInfo = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: 'clamp(1rem, 3vw, 1.4rem)',
  color: 'rgba(255, 255, 255, 0.9)',
  marginBottom: '2rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
  lineHeight: 1.6,
  maxWidth: '600px',
  margin: '0 auto 2rem auto',
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  position: 'relative',
  zIndex: 2,
}))

const LoadingText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffd700',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
}))

const SuccessTitle = styled(MainTitle)(({ theme }) => ({
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
}))

const FailureTitle = styled(MainTitle)(({ theme }) => ({
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
}))

const PendingTitle = styled(MainTitle)(({ theme }) => ({
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
}))

export default function Status() {
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'failure' | 'pending'>('success')
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const raffleId = searchParams.get('raffleId')
  const raffleAlias = searchParams.get('raffleAlias')
  const numbers = searchParams.get('numbers')

  useEffect(() => {
    if (status === 'success') {
      if (raffleId && numbers) {
        setTitle('¡Números Comprados!')
        setInfo(`Has comprado exitosamente los números: ${numbers}`)
        setStatusType('success')
      } else {
        setTitle('¡Gracias!')
        setInfo('Tu pago fue procesado exitosamente.')
        setStatusType('success')
      }
    } else if (status === 'failure') {
      setTitle('Algo falló :(')
      setInfo('Tu pago no pudo ser procesado.')
      setStatusType('failure')
    } else if (status === 'pending') {
      setTitle('Procesando...')
      setInfo('Tu pago se está procesando.')
      setStatusType('pending')
    } else {
      router.push('/')
      return
    }
    
    // Redirigir después de 4 segundos
    setTimeout(() => {
      if (raffleAlias) {
        router.push(`/${raffleAlias}`)
      } else if (raffleId) {
        router.push(`/${raffleId}`)
      } else {
        router.push('/')
      }
    }, 4000)
  }, [status, raffleId, raffleAlias, numbers, router])

  const renderTitle = () => {
    switch (statusType) {
      case 'success':
        return <SuccessTitle className="glow-text">{title}</SuccessTitle>
      case 'failure':
        return <FailureTitle className="glow-text">{title}</FailureTitle>
      case 'pending':
        return <PendingTitle className="glow-text">{title}</PendingTitle>
      default:
        return <MainTitle className="glow-text">{title}</MainTitle>
    }
  }

  return (
    <PageContainer>
      <ContentWrapper maxWidth="xl">
        <StatusContainer>
          <StatusInfo>
            {renderTitle()}
            {info}
          </StatusInfo>
          
          <LoadingContainer>
            <CircularProgress 
              size={40} 
              thickness={4}
              sx={{ 
                color: '#FFD700',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'
              }} 
            />
            <LoadingText>
              En breve serás redireccionado...
            </LoadingText>
          </LoadingContainer>
        </StatusContainer>
      </ContentWrapper>
    </PageContainer>
  )
}
