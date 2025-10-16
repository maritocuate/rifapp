'use client'

import { Box } from '@mui/material'
import { formatPrice } from '@/lib/utils'
import { ShareButtons } from './share'
import { 
  RaffleInfoContainer, 
  CostInfo, 
  Separator, 
  UserInfo, 
  AvailableInfo,
  ShareSection
} from './styles'
import { RaffleInfoProps } from './types'

export function RaffleInfo({ numberCost, username, availableNumbers, title, description, url }: RaffleInfoProps) {
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

      <ShareSection>
        <ShareButtons 
          title={title || "Rifa"}
          description={description}
          url={url || window.location.href}
        />
      </ShareSection>
    </RaffleInfoContainer>
  )
}
