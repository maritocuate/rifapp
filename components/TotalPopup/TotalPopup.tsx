'use client'

import React from 'react'
import { PopupContainer } from './TotalPopup.styles'
import { TotalDisplay } from './TotalDisplay'
import { useTotalPopup } from './useTotalPopup'

interface Props {
  selectedCount: number
  onButtonClick?: () => void
}

const TotalPopup: React.FC<Props> = ({ selectedCount, onButtonClick }) => {
  const { isVisible, isExiting, totalAmount, amountTextRef, isMounted } = useTotalPopup({ selectedCount })
  if (!isMounted || !isVisible) return null

  return (
    <PopupContainer isVisible={isVisible} isExiting={isExiting}>
      <TotalDisplay 
        totalAmount={totalAmount} 
        amountTextRef={amountTextRef}
        onButtonClick={onButtonClick}
      />
    </PopupContainer>
  )
}

export {TotalPopup}
