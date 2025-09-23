'use client'

import Script from 'next/script'

interface UmamiProps {
  websiteId?: string
}

export default function Umami({ websiteId }: UmamiProps) {
  const umamiWebsiteId = websiteId || process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  if (!umamiWebsiteId) {
    console.warn('Umami website ID no está configurado')
    return null
  }

  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={umamiWebsiteId}
      strategy="afterInteractive"
    />
  )
}
