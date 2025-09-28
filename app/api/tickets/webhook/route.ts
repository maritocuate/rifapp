import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type === 'payment') {
      const paymentId = data.id
      
      // Obtener información del pago desde MercadoPago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MERCADOLIBRE_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener información del pago')
      }

      const payment = await response.json()
      
      // Extraer información del external_reference
      const externalRef = payment.external_reference
      const [raffleId, numbersStr, buyerId] = externalRef.split('-')
      const numbers = numbersStr.split(',').map(Number)

      const supabase = await createClient()

      if (payment.status === 'approved') {
        // Marcar tickets como vendidos
        const { error: updateError } = await supabase
          .from('tickets')
          .update({ 
            is_sold: true, 
            buyer_id: buyerId 
          })
          .eq('raffle_id', raffleId)
          .in('number', numbers.map((n: number) => n.toString()))

        if (updateError) {
          console.error('Error updating tickets:', updateError)
          return NextResponse.json({ error: 'Error updating tickets' }, { status: 500 })
        }

        console.log(`Tickets ${numbers.join(', ')} vendidos para rifa ${raffleId}`)
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
