import { Metadata } from 'next'
import TerminosClient from './TerminosClient'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Riffita',
  description:
    'Conoce los términos y condiciones para usar Riffita. Información sobre participación, premios y responsabilidades en nuestros sorteos online.',
  keywords: [
    'términos y condiciones',
    'bases y condiciones',
    'sorteos legales',
    'rifas online',
    'participación sorteos',
  ],
  openGraph: {
    title: 'Términos y Condiciones | Riffita',
    description:
      'Conoce los términos y condiciones para usar Riffita. Información sobre participación, premios y responsabilidades en nuestros sorteos online.',
    type: 'website',
    url: 'https://riffita.com/terminos',
  },
}

export default function TerminosPage() {
  return <TerminosClient />
}
