'use client'

import { useState } from 'react'
import { StepContainer, StepTitle, StepDescription } from './styles'
import { ReviewCardComponent } from './ReviewCard'
import { TermsContainerComponent } from './TermsContainer'
import { Captcha } from '@/components/Captcha'
import { ReviewStepProps } from './types'

export function ReviewStep({ data, errors, onTermsAccepted, onCaptchaVerified }: ReviewStepProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleTermsChange = (accepted: boolean) => {
    setTermsAccepted(accepted)
    onTermsAccepted?.(accepted)
  }

  const handleCaptchaVerify = (token: string | null) => {
    const verified = !!token
    setCaptchaVerified(verified)
    onCaptchaVerified?.(verified)
  }

  const handleCaptchaExpire = () => {
    setCaptchaVerified(false)
    onCaptchaVerified?.(false)
  }

  return (
    <StepContainer>
      <StepTitle>Revisión Final</StepTitle>
      <StepDescription>
        Revisá todos los detalles antes de crear tu rifa
      </StepDescription>

      <ReviewCardComponent data={data} />
      
      <TermsContainerComponent
        termsAccepted={termsAccepted}
        onTermsChange={handleTermsChange}
        error={errors.terms}
      />

      <Captcha
        onVerify={handleCaptchaVerify}
        onExpire={handleCaptchaExpire}
        error={errors.captcha}
      />
    </StepContainer>
  )
}
