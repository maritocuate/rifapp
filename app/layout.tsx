import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel, Orbitron } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const cinzel = Cinzel({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  variable: '--font-cinzel'
})

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'],
  variable: '--font-orbitron'
})

export const metadata: Metadata = {
  title: 'Riffita App',
  description: 'Crea tu rifa online!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
