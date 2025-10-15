'use client'

import { styled } from '@mui/material/styles'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen: boolean }>(({ fullScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(fullScreen && {
    minHeight: '100vh',
  }),
  ...(!fullScreen && {
    padding: '1rem',
  }),
}))

const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
})

const SpinnerContainer = styled('div')({
  position: 'relative',
})

const Spinner = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: 'sm' | 'md' | 'lg' }>(({ size }) => {
  const sizeMap = {
    sm: '20px',
    md: '40px',
    lg: '60px',
  }
  
  return {
    width: sizeMap[size],
    height: sizeMap[size],
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      border: '3px solid transparent',
      borderTop: '3px solid #ffd700',
      borderRight: '3px solid #ffd700',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '70%',
      height: '70%',
      border: '2px solid transparent',
      borderBottom: '2px solid #ffed4e',
      borderLeft: '2px solid #ffed4e',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite reverse',
    },
  }
})

const MessageText = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: 'sm' | 'md' | 'lg' }>(({ size }) => {
  const fontSizeMap = {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
  }
  
  return {
    color: '#ffd700',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: fontSizeMap[size],
  }
})

export function LoadingSpinner({ 
  message = 'Cargando...', 
  size = 'md',
  fullScreen = false,
}: LoadingSpinnerProps) {
  return (
    <Container fullScreen={fullScreen}>
      <ContentWrapper>
        <SpinnerContainer>
          <Spinner size={size} />
        </SpinnerContainer>
        
        {message && (
          <MessageText size={size}>
            {message}
          </MessageText>
        )}
      </ContentWrapper>
    </Container>
  )
}
