import { Metadata } from 'next'
import MakeClient from './MakeClient'

export const metadata: Metadata = {
  title: 'Crear Sorteo Online Gratis | Riffita',
  description:
    'Crea tu sorteo online gratis en minutos con Riffita. Configura premios, participantes y fechas de forma fácil y segura.',
  keywords: [
    'crear sorteo online',
    'sorteo gratis',
    'organizar sorteo',
    'configurar rifa',
    'sorteo digital',
  ],
  openGraph: {
    title: 'Crear Sorteo Online Gratis | Riffita',
    description:
      'Crea tu sorteo online gratis en minutos con Riffita. Configura premios, participantes y fechas de forma fácil y segura.',
    type: 'website',
    url: 'https://riffita.com/make',
  },
}

export default function MakePage() {
  return <MakeClient />
}
