'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Status() {
  const [title, setTitle] = useState('')
  const [info, setInfo] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const raffleId = searchParams.get('raffleId')
  const numbers = searchParams.get('numbers')

  useEffect(() => {
    if (status === 'success') {
      if (raffleId && numbers) {
        setTitle('¡Números Comprados!')
        setInfo(`Has comprado exitosamente los números: ${numbers}`)
      } else {
        setTitle('¡Gracias!')
        setInfo('Tu pago fue procesado exitosamente.')
      }
    } else if (status === 'failure') {
      setTitle('Algo falló :(')
      setInfo('Tu pago no pudo ser procesado.')
    } else if (status === 'pending') {
      setTitle('Procesando...')
      setInfo('Tu pago se está procesando.')
    } else {
      router.push('/')
      return
    }
    
    // Redirigir después de 4 segundos
    setTimeout(() => {
      if (raffleId) {
        router.push(`/${raffleId}`)
      } else {
        router.push('/')
      }
    }, 4000)
  }, [status, raffleId, numbers, router])

  return (
    <div className="mx-auto mb-6 sm:max-w-xl">
      <h1 className="text-6xl font-bold sm:text-7xl">{title}</h1>
      <p className="mt-5 text-gray-600 sm:text-lg">
        {info} En breve serás redireccionado.
      </p>
    </div>
  )
}
