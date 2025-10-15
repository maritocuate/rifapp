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
    // Validar Content-Type
    const contentType = req.headers.get('content-type')
    console.log('📄 Content-Type:', contentType)
    
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ Content-Type incorrecto:', contentType)
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }
    
    // Parsear JSON con mejor manejo de errores
    let body
    try {
      body = await req.json()
      console.log('📦 Body recibido:', JSON.stringify(body, null, 2))
    } catch (parseError) {
      console.error('❌ Error parsing JSON:', parseError)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    const { type, data, action } = body
    console.log('📊 Datos del webhook:')
    console.log('  - Type:', type)
    console.log('  - Action:', action)
    console.log('  - Data:', data)

    if (type === 'payment') {
      console.log('💳 Procesando notificación de pago')
      const paymentId = data.id
      console.log('🆔 Payment ID:', paymentId)
      
      // Validar token de MercadoPago
      const token = process.env.MERCADOLIBRE_TOKEN
      if (!token) {
        console.error('❌ MERCADOLIBRE_TOKEN no configurado')
        return NextResponse.json({ error: 'Token not configured' }, { status: 500 })
      }
      console.log('🔑 Token configurado:', token ? 'Sí' : 'No')
      
      // Obtener información del pago desde MercadoPago
      console.log('🔍 Obteniendo información del pago desde MercadoPago...')
      try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          console.error('❌ Error al obtener información del pago:', response.status, response.statusText)
          const errorText = await response.text()
          console.error('❌ Error response:', errorText)
          return NextResponse.json({ error: 'Error al obtener información del pago' }, { status: 500 })
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

        // Conectar a Supabase
        console.log('🔗 Conectando a Supabase...')
        const supabase = await createClient()
        console.log('✅ Conexión a Supabase exitosa')

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
      } catch (apiError) {
        console.error('❌ Error en API de MercadoPago:', apiError)
        console.error('❌ API Error details:', apiError instanceof Error ? apiError.message : 'Unknown error')
        return NextResponse.json({ error: 'API error' }, { status: 500 })
      }
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
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
