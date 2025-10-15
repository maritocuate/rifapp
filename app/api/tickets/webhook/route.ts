import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

// Endpoint GET para debugging - verificar que el webhook es accesible
export async function GET(req: NextRequest) {
  console.log('🧪 WEBHOOK GET ACCESSED:', new Date().toISOString())
  console.log('🔗 URL:', req.url)
  console.log('📋 Headers:', Object.fromEntries(req.headers.entries()))
  
  return NextResponse.json({ 
    message: 'Webhook endpoint is working',
    timestamp: new Date().toISOString(),
    url: req.url
  })
}

export async function POST(req: NextRequest) {
  console.log('🔔 WEBHOOK RECIBIDO:', new Date().toISOString())
  console.log('🔗 URL:', req.url)
  console.log('📋 Headers:', Object.fromEntries(req.headers.entries()))
  console.log('🌐 User Agent:', req.headers.get('user-agent'))
  
  try {
    const body = await req.json()
    console.log('📦 Body recibido:', JSON.stringify(body, null, 2))
    
    const { type, data, action } = body
    console.log('📊 Datos del webhook:')
    console.log('  - Type:', type)
    console.log('  - Action:', action)
    console.log('  - Data:', data)

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
      
      if (!externalRef) {
        console.error('❌ No se encontró external_reference en el pago')
        return NextResponse.json({ error: 'No external reference found' }, { status: 400 })
      }
      
      const [raffleId, numbersStr, buyerId] = externalRef.split('|')
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
    } else if (type === 'merchant_order') {
      console.log('📦 Procesando merchant_order:', data)
      console.log('📊 Merchant Order ID:', data.id)
      console.log('📊 Status:', data.status)
      
      // Por ahora solo logueamos merchant_order, no procesamos tickets
      // Los tickets se procesan solo con payment webhooks
      return NextResponse.json({ success: true })
    } else {
      console.log('ℹ️ Tipo de notificación no manejado:', type)
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('❌ Webhook error:', error)
    console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
