'use client'

import { Button } from '@/components/ui/button'
import { House } from '@phosphor-icons/react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: 0,
  height: '44px',
  width: '44px',
  borderRadius: '50%',
  border: '1px solid rgba(250, 204, 21, 0.3)',
  background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(250, 204, 21, 0.05))',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(250, 204, 21, 0.1))',
    boxShadow: '0 10px 15px -3px rgba(250, 204, 21, 0.2), 0 4px 6px -2px rgba(250, 204, 21, 0.1)',
  },
}))

const StyledIcon = styled(House)({
  height: '16px',
  width: '16px',
  color: '#facc15',
})

interface HomeButtonProps {
  className?: string
}

export function HomeButton({ className = "" }: HomeButtonProps) {
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/')
  }

  return (
    <StyledButton 
      onClick={handleHomeClick}
      variant="ghost"
      className={className}
    >
      <StyledIcon />
    </StyledButton>
  )
}
