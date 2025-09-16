import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface UseTotalPopupProps {
  selectedCount: number
}

interface UseTotalPopupReturn {
  isVisible: boolean
  isExiting: boolean
  totalAmount: number
  amountTextRef: React.RefObject<HTMLDivElement>
  isMounted: boolean
}

const useTotalPopup = ({ selectedCount }: UseTotalPopupProps): UseTotalPopupReturn => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const previousTotalRef = useRef<number>(0)
  const amountTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const totalAmount = selectedCount * 5

    if (selectedCount > 0) {
      setIsVisible(true)
      setIsExiting(false)

      if (previousTotalRef.current > 0 && previousTotalRef.current !== totalAmount) {
        if (amountTextRef.current) {
          gsap.fromTo(
            amountTextRef.current,
            {
              y: 20,
            },
            {
              y: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.3)',
            }
          )
        }
      }

      previousTotalRef.current = totalAmount
    } else if (isVisible) {
      setIsExiting(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setIsExiting(false)
        previousTotalRef.current = 0
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [selectedCount, isVisible, isMounted])

  const totalAmount = selectedCount * 5

  return {
    isVisible,
    isExiting,
    totalAmount,
    amountTextRef,
    isMounted,
  }
}

export {useTotalPopup}