import React from 'react'
import { ShoppingCartIcon } from '@phosphor-icons/react'
import { AmountText, LabelText, ActionButton } from './TotalPopup.styles'

interface TotalDisplayProps {
  totalAmount: number
  amountTextRef: React.RefObject<HTMLDivElement>
  onButtonClick?: () => void
}

export const TotalDisplay: React.FC<TotalDisplayProps> = ({ 
  totalAmount, 
  amountTextRef, 
  onButtonClick
}) => {
  return (
    <>
      <LabelText>Total</LabelText>
      <AmountText ref={amountTextRef}>${totalAmount}</AmountText>
      <ActionButton onClick={onButtonClick}>
        <ShoppingCartIcon size={20} weight="bold" />
      </ActionButton>
    </>
  )
}
