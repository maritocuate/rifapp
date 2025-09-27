'use client'

import { Calendar, CurrencyDollar, Hash, Eye } from '@phosphor-icons/react'
import { formatPrice } from '@/lib/utils'

interface Purchase {
  raffle: {
    id: string
    title: string
    alias: string
    number_cost: number
    status: string
  }
  numbers: string[]
}

interface UserPurchasesProps {
  purchases: Purchase[]
  onRaffleClick: (alias: string) => void
}

export function UserPurchases({ purchases, onRaffleClick }: UserPurchasesProps) {
  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
        </div>
        <h3 className="text-lg font-mono text-gray-300 mb-2">
          No has comprado números
        </h3>
        <p className="text-gray-500 text-sm">
          Participa en rifas para ver tus números aquí
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase, index) => (
        <div
          key={`${purchase.raffle.id}-${index}`}
          className="bg-gradient-to-br from-black/30 to-gray-900/30 backdrop-blur-xl border border-yellow-400/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all duration-300 cursor-pointer group"
          onClick={() => onRaffleClick(purchase.raffle.alias)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-400 font-mono mb-2 group-hover:text-yellow-300 transition-colors">
                {purchase.raffle.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="font-mono">
                    {purchase.numbers.length} número{purchase.numbers.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollar className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="font-mono">
                    {formatPrice(purchase.numbers.length * purchase.raffle.number_cost)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                purchase.raffle.status === 'activo' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {purchase.raffle.status}
              </span>
              <Eye className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-mono text-gray-400 mb-2 text-left">Números comprados:</h4>
            <div className="flex flex-wrap gap-2">
              {purchase.numbers.map((number) => (
                <span
                  key={number}
                  className="px-3 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-lg text-sm font-mono font-bold"
                >
                  {number}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
