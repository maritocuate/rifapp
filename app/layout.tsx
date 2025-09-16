import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel, Orbitron } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap'
})

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Riffita App',
  description: 'Crea tu rifa online!',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${cinzel.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
