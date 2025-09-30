import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Riffita: Crea Sorteos Online Gratis | Plataforma de Rifas Digitales',
  description:
    'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos. Fácil de usar, seguro y confiable.',
  keywords: [
    'sorteos online gratis',
    'rifas digitales',
    'concursos online',
    'organizar sorteos',
    'plataforma de rifas',
    'sorteos virtuales',
    'rifas online',
    'concursos digitales',
  ],
  openGraph: {
    title: 'Riffita: Crea Sorteos Online Gratis',
    description:
      'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos.',
    type: 'website',
    url: 'https://riffita.com',
    images: [
      {
        url: '/images/logo-md.png',
        width: 1200,
        height: 630,
        alt: 'Riffita - Sorteos Online Gratis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riffita: Crea Sorteos Online Gratis',
    description:
      'Crea sorteos online gratis con Riffita. La mejor plataforma para organizar rifas digitales, sorteos y concursos.',
    images: ['/images/logo-md.png'],
  },
}

export default function Home() {
  return <HomeClient />
}
