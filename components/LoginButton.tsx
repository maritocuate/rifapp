'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserMenu } from '@/components/auth/UserMenu'
import { Button } from '@/components/ui/button'
import { UserIcon } from '@phosphor-icons/react'

interface LoginButtonProps {
  onShowAuthModal: () => void
  className?: string
}

export function LoginButton({ onShowAuthModal, className = "" }: LoginButtonProps) {
  const { user } = useAuth()

  if (user) {
    return <UserMenu />
  }

  return (
    <Button 
      onClick={onShowAuthModal}
      variant="ghost"
      className={`relative p-0 h-11 w-11 rounded-full border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 backdrop-blur-sm hover:from-yellow-400/20 hover:to-yellow-400/10 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 ${className}`}
    >
      <UserIcon className="h-4 w-4 text-yellow-400" />
    </Button>
  )
}
