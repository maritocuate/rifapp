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
      const [raffleAlias, numbersStr, buyerId] = externalRef.split('-')
      const numbers = numbersStr.split(',').map(Number)

      const supabase = await createClient()

      // Obtener el ID de la rifa usando el alias
      const { data: raffle, error: raffleError } = await supabase
        .from('raffles')
        .select('id')
        .eq('alias', raffleAlias)
        .single()

      if (raffleError || !raffle) {
        console.error('Error finding raffle by alias:', raffleError)
        return NextResponse.json({ error: 'Raffle not found' }, { status: 404 })
      }

      if (payment.status === 'approved') {
        console.log(`Procesando pago aprobado para rifa ${raffleAlias}, números: ${numbers.join(', ')}, buyer: ${buyerId}`)
        
        // Verificar que los tickets existan antes de actualizarlos
        const { data: existingTickets, error: checkError } = await supabase
          .from('tickets')
          .select('number, is_sold')
          .eq('raffle_id', raffle.id)
          .in('number', numbers.map((n: number) => n.toString()))

        if (checkError) {
          console.error('Error verificando tickets existentes:', checkError)
          return NextResponse.json({ error: 'Error verificando tickets' }, { status: 500 })
        }

        if (!existingTickets || existingTickets.length === 0) {
          console.error(`No se encontraron tickets para los números: ${numbers.join(', ')}`)
          return NextResponse.json({ error: 'Tickets no encontrados' }, { status: 404 })
        }

        // Verificar que los tickets no estén ya vendidos
        const soldTickets = existingTickets.filter(ticket => ticket.is_sold)
        if (soldTickets.length > 0) {
          console.error(`Algunos tickets ya están vendidos: ${soldTickets.map(t => t.number).join(', ')}`)
          return NextResponse.json({ error: 'Algunos tickets ya están vendidos' }, { status: 409 })
        }

        // Marcar tickets como vendidos
        const { error: updateError } = await supabase
          .from('tickets')
          .update({ 
            is_sold: true, 
            buyer_id: buyerId 
          })
          .eq('raffle_id', raffle.id)
          .in('number', numbers.map((n: number) => n.toString()))

        if (updateError) {
          console.error('Error updating tickets:', updateError)
          return NextResponse.json({ error: 'Error updating tickets' }, { status: 500 })
        }

        console.log(`✅ Tickets ${numbers.join(', ')} vendidos exitosamente para rifa ${raffleAlias}`)
      } else {
        console.log(`Pago con estado: ${payment.status} - No se procesarán los tickets`)
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
