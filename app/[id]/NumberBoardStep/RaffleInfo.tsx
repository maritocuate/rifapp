'use client'

import { Box } from '@mui/material'
import { formatPrice } from '@/lib/utils'
import { 
  RaffleInfoContainer, 
  CostInfo, 
  Separator, 
  UserInfo, 
  AvailableInfo 
} from './styles'
import { RaffleInfoProps } from './types'

export function RaffleInfo({ numberCost, username, availableNumbers }: RaffleInfoProps) {
  return (
    <RaffleInfoContainer>
      <CostInfo>
        💰 {formatPrice(numberCost)} por número
      </CostInfo>
      
      <Separator>
        |
      </Separator>
      
      <UserInfo>
        👤 {username || "Organizador"}
      </UserInfo>
      
      <Separator>
        |
      </Separator>
      
      <AvailableInfo>
        🎫 {availableNumbers} números disponibles
      </AvailableInfo>
    </RaffleInfoContainer>
  )
}
