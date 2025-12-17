'use client'

import Image from 'next/image'
import { Calendar, CurrencyDollar, Users, Eye } from '@phosphor-icons/react'
import { formatPrice } from '@/lib/utils'

interface Raffle {
  id: string
  title: string
  alias: string
  description?: string
  number_cost: number
  status: string
  created_at: string
  prize_description?: string
  prize_image_url?: string
}

interface UserRafflesProps {
  raffles: Raffle[]
  onRaffleClick: (alias: string) => void
}

export function UserRaffles({ raffles, onRaffleClick }: UserRafflesProps) {
  if (raffles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
        </div>
        <h3 className="text-lg font-mono text-gray-300 mb-2">
          No has creado ninguna rifa
        </h3>
        <p className="text-gray-500 text-sm">
          Crea tu primera rifa para comenzar a organizar sorteos
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {raffles.map((raffle) => (
        <div
          key={raffle.id}
          className="bg-gradient-to-br from-black/30 to-gray-900/30 backdrop-blur-xl border border-yellow-400/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all duration-300 cursor-pointer group"
          onClick={() => onRaffleClick(raffle.alias)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-400 font-mono mb-2 group-hover:text-yellow-300 transition-colors">
                {raffle.title}
              </h3>
              {raffle.description && (
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {raffle.description}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                raffle.status === 'activo' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {raffle.status}
              </span>
              <Eye className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300">
                <CurrencyDollar className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="font-mono">{formatPrice(raffle.number_cost)}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="font-mono">
                  {new Date(raffle.created_at).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>
            {raffle.prize_image_url && (
              <div className="h-12 w-12 rounded-lg overflow-hidden border border-yellow-400/20 relative">
                <Image 
                  src={raffle.prize_image_url} 
                  alt="Premio" 
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
