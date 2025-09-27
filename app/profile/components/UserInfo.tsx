'use client'

import { User, Envelope } from '@phosphor-icons/react'

interface UserInfoProps {
  email: string
}

export function UserInfo({ email }: UserInfoProps) {
  const getUserInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  return (
    <div className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-xl border border-yellow-400/20 rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-xl shadow-lg">
          {getUserInitials(email)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-400 font-mono mb-1">
            {email.split('@')[0]}
          </h2>
          <div className="flex items-center text-gray-300 text-sm">
            <Envelope className="h-4 w-4 mr-2" />
            {email}
          </div>
        </div>
      </div>
    </div>
  )
}
