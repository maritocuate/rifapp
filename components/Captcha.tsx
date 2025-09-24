'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'

const CaptchaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '10px',
  marginTop: '1rem',
}))

const CaptchaTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#ffd700',
  textAlign: 'center',
  textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
}))

const CaptchaDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  textAlign: 'center',
  lineHeight: 1.4,
}))

interface CaptchaProps {
  onVerify: (token: string | null) => void
  onExpire: () => void
  error?: string
}

export function Captcha({ onVerify, onExpire, error }: CaptchaProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

  return (
    <CaptchaContainer>
      <CaptchaTitle>Verificación de Seguridad</CaptchaTitle>
      
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={onVerify}
        onExpired={onExpire}
        theme="dark"
        size="normal"
      />
      
      {error && (
        <Typography sx={{
          fontFamily: 'var(--font-orbitron), monospace',
          fontSize: '0.8rem',
          color: '#ff6b6b',
          textAlign: 'center',
          marginTop: '0.5rem',
        }}>
          ⚠️ {error}
        </Typography>
      )}
    </CaptchaContainer>
  )
}
