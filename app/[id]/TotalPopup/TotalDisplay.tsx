import React, { useState } from 'react'
import { ShoppingCartIcon } from '@phosphor-icons/react'
import { AmountText, LabelText, ActionButton } from './TotalPopup.styles'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/auth/AuthModal'

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
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    
    // Si el usuario está autenticado, proceder con el checkout
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <>
      <LabelText>Total</LabelText>
      <AmountText ref={amountTextRef}>${totalAmount}</AmountText>
      <ActionButton onClick={handleCheckout}>
        <ShoppingCartIcon size={20} weight="bold" />
      </ActionButton>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </>
  )
}
