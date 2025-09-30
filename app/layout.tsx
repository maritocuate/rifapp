import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel, Orbitron } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { TRPCProvider } from '@/client/trpc-provider'
import Umami from '@/components/Umami'
import Footer from '@/components/Footer'
import { StructuredData } from '@/components/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Riffita: Crea Sorteos Online Gratis | Plataforma de Rifas Digitales',
    template: '%s | Riffita',
  },
  description:
    'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos. Fácil de usar, seguro y confiable.',
  keywords: [
    'sorteos online',
    'rifas digitales',
    'concursos online',
    'sorteos gratis',
    'plataforma de rifas',
    'organizar sorteos',
    'rifas virtuales',
    'concursos digitales',
  ],
  authors: [{ name: 'Riffita' }],
  creator: 'Riffita',
  publisher: 'Riffita',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://riffita.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://riffita.com',
    siteName: 'Riffita',
    title: 'Riffita: Crea Sorteos Online Gratis | Plataforma de Rifas Digitales',
    description:
      'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos. Fácil de usar, seguro y confiable.',
    images: [
      {
        url: '/images/logo-md.png',
        width: 1200,
        height: 630,
        alt: 'Riffita - Sorteos Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riffita: Crea Sorteos Online Gratis',
    description:
      'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos.',
    images: ['/images/logo-md.png'],
    creator: '@riffita',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="webapplication" />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} ${orbitron.variable} geometric-bg`}>
        <TRPCProvider>
          <AuthProvider>
            {children}
            <Footer />
          </AuthProvider>
        </TRPCProvider>
        <Umami />
      </body>
    </html>
  )
}
