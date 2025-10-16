export const ICON_SIZE = 18
export const SUCCESS_AUTO_CLOSE_DELAY = 3000
export const ANIMATION_DELAY = 300
export const COPY_RESET_DELAY = 2000

export const SHARE_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram'
} as const

export const SHARE_URLS = {
  facebook: (url: string, text: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  twitter: (url: string, text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  whatsapp: (url: string, text: string) => `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
  telegram: (url: string, text: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
} as const
