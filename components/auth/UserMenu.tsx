'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, User } from 'lucide-react'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  if (!user) return null

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut()
    setIsSigningOut(false)
  }

  const handleProfileClick = () => {
    router.push('/profile')
  }


  const getUserInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 backdrop-blur-sm hover:from-yellow-400/20 hover:to-yellow-400/10 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20"
        >
          <Avatar className="h-8 w-8 border border-yellow-400/30">
            <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-bold text-sm shadow-lg">
              {getUserInitials(user.email || '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl border border-yellow-400/30 shadow-2xl shadow-yellow-400/10" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-yellow-400 font-mono">
              {user.email}
            </p>
            <p className="text-xs text-gray-400 font-mono">
              Usuario activo
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-yellow-400/20" />
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className="text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 focus:bg-yellow-400/10 focus:text-yellow-400 transition-all duration-200 font-mono cursor-pointer"
        >
          <User className="mr-3 h-4 w-4 text-yellow-400" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-yellow-400/20" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-300 transition-all duration-200 font-mono"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>{isSigningOut ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
