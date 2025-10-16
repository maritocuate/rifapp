'use client'

import { useState, useCallback } from 'react'
import { Button, ButtonGroup, Tooltip, Box, styled, Snackbar, Alert } from '@mui/material'
import { 
  FacebookLogoIcon, 
  TwitterLogoIcon, 
  WhatsappLogoIcon, 
  TelegramLogoIcon, 
  ShareIcon, 
  CopyIcon,
  CheckIcon
} from '@phosphor-icons/react'
import { useShare } from './useShare'
import { ShareSuccess } from './ShareSuccess'
import { ICON_SIZE, COPY_RESET_DELAY, SHARE_URLS, SHARE_PLATFORMS } from './constants'

const ShareContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  marginBottom: '-25px'
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  border: '1px solid rgba(255, 255, 255, 0.8)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderBottom: 'none',
  borderRadius: '10px 10px 0 0',
  opacity: 0.8,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
  '& .MuiButton-root': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    minWidth: 60,
    height: 50,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:first-of-type': {
      borderRight: 'none',
    },
    '&:last-of-type': {
      borderLeft: 'none',
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      borderLeft: 'none',
      borderRight: 'none',
    }
  }
}))

interface ShareButtonsProps {
  title: string
  description?: string
  url: string
}

export function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { share, isSharing, canShare } = useShare()

  const shareText = `🎉 ¡Participa en esta increíble rifa! ${title}${description ? ` - ${description}` : ''}`

  const handleShareSuccess = useCallback(() => {
    setShowSuccess(true)
  }, [])

  const handleShare = useCallback((platform: keyof typeof SHARE_URLS) => {
    try {
      const shareUrl = SHARE_URLS[platform](url, shareText)
      window.open(shareUrl, '_blank', 'width=600,height=400')
      handleShareSuccess()
    } catch (err) {
      setError('Error al abrir la ventana de compartir')
    }
  }, [url, shareText, handleShareSuccess])

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_RESET_DELAY)
    } catch (err) {
      setError('Error al copiar el enlace')
    }
  }, [url])

  const handleNativeShare = useCallback(async () => {
    try {
      await share({
        title,
        text: shareText,
        url
      })
      handleShareSuccess()
    } catch (err) {
      setError('Error al compartir')
    }
  }, [share, title, shareText, url, handleShareSuccess])

  const handleCloseError = useCallback(() => {
    setError(null)
  }, [])

  return (
    <ShareContainer>
      <StyledButtonGroup variant="outlined" size="small">
        {canShare && (
          <Tooltip title="Compartir">
            <Button 
              onClick={handleNativeShare} 
              disabled={isSharing}
              aria-label="Compartir usando aplicación nativa"
            >
              <ShareIcon size={ICON_SIZE} />
            </Button>
          </Tooltip>
        )}
        
        <Tooltip title="Compartir en Facebook" placement="top">
          <Button 
            onClick={() => handleShare(SHARE_PLATFORMS.FACEBOOK)}
            aria-label="Compartir en Facebook"
          >
            <FacebookLogoIcon size={ICON_SIZE} />
          </Button>
        </Tooltip>

        <Tooltip title="Compartir en Twitter" placement="top">
          <Button 
            onClick={() => handleShare(SHARE_PLATFORMS.TWITTER)}
            aria-label="Compartir en Twitter"
          >
            <TwitterLogoIcon size={ICON_SIZE} />
          </Button>
        </Tooltip>

        <Tooltip title="Compartir en WhatsApp" placement="top">
          <Button 
            onClick={() => handleShare(SHARE_PLATFORMS.WHATSAPP)}
            aria-label="Compartir en WhatsApp"
          >
            <WhatsappLogoIcon size={ICON_SIZE} />
          </Button>
        </Tooltip>

        <Tooltip title="Compartir en Telegram" placement="top">
          <Button 
            onClick={() => handleShare(SHARE_PLATFORMS.TELEGRAM)}
            aria-label="Compartir en Telegram"
          >
            <TelegramLogoIcon size={ICON_SIZE} />
          </Button>
        </Tooltip>

        <Tooltip title={copied ? 'Copiado!' : 'Copiar enlace'} placement="top">
          <Button 
            onClick={handleCopyLink}
            aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'}
          >
            {copied ? <CheckIcon size={ICON_SIZE} /> : <CopyIcon size={ICON_SIZE} />}
          </Button>
        </Tooltip>
      </StyledButtonGroup>

      <ShareSuccess 
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="¡Rifa compartida exitosamente!"
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ShareContainer>
  )
}
