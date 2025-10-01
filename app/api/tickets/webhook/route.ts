import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  console.log('🔔 WEBHOOK RECIBIDO:', new Date().toISOString())
  
  try {
    const body = await req.json()
    console.log('📦 Body recibido:', JSON.stringify(body, null, 2))
    
    const { type, data } = body

    if (type === 'payment') {
      console.log('💳 Procesando notificación de pago')
      const paymentId = data.id
      console.log('🆔 Payment ID:', paymentId)
      
      // Obtener información del pago desde MercadoPago
      console.log('🔍 Obteniendo información del pago desde MercadoPago...')
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MERCADOLIBRE_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        console.error('❌ Error al obtener información del pago:', response.status, response.statusText)
        throw new Error('Error al obtener información del pago')
      }

      const payment = await response.json()
      console.log('💰 Información del pago:', JSON.stringify(payment, null, 2))
      
      // Extraer información del external_reference
      const externalRef = payment.external_reference
      console.log('🔗 External reference:', externalRef)
      
      const [raffleId, numbersStr, buyerId] = externalRef.split('-')
      const numbers = numbersStr.split(',').map(Number)
      
      console.log('📊 Datos extraídos:')
      console.log('  - Raffle ID:', raffleId)
      console.log('  - Numbers:', numbers)
      console.log('  - Buyer ID:', buyerId)

      const supabase = await createClient()

      // Verificar que la rifa existe
      console.log('🔍 Verificando que la rifa existe...')
      const { data: raffle, error: raffleError } = await supabase
        .from('raffles')
        .select('id')
        .eq('id', raffleId)
        .single()

      if (raffleError || !raffle) {
        console.error('❌ Error finding raffle:', raffleError)
        return NextResponse.json({ error: 'Raffle not found' }, { status: 404 })
      }
      
      console.log('✅ Rifa encontrada:', raffle.id)

      if (payment.status === 'approved') {
        console.log('✅ Pago aprobado, creando tickets...')
        
        // Crear nuevos registros de tickets vendidos
        const ticketRecords = numbers.map((number: number) => ({
          raffle_id: raffle.id,
          number: number,
          is_sold: true,
          buyer_id: buyerId
        }))
        
        console.log('🎫 Registros de tickets a crear:', JSON.stringify(ticketRecords, null, 2))

        const { error: insertError } = await supabase
          .from('tickets')
          .insert(ticketRecords)

        if (insertError) {
          console.error('❌ Error creating ticket records:', insertError)
          return NextResponse.json({ error: 'Error creating ticket records' }, { status: 500 })
        }

        console.log('✅ Nuevos tickets creados exitosamente:', numbers.join(', '))
      } else {
        console.log('⚠️ Pago no aprobado, status:', payment.status)
      }

      return NextResponse.json({ success: true })
    }

    console.log('ℹ️ Tipo de notificación no es payment:', type)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
