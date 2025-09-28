'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ProfilePage } from './ProfilePage'

export default function Profile() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-yellow-400 font-mono">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <ProfilePage 
    userId={user.id} 
    userEmail={user.email || ''} 
    username={user.user_metadata?.username || user.user_metadata?.display_name}
  />
}
