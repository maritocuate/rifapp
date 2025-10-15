import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

// Endpoint GET para verificar que el webhook es accesible
export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    message: 'Webhook endpoint is working',
    timestamp: new Date().toISOString()
  })
}

export async function POST(req: NextRequest) {
  try {
    // Validar Content-Type
    const contentType = req.headers.get('content-type')
    
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }
    
    // Parsear JSON
    let body
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    const { type, data } = body

    if (type === 'payment') {
      const paymentId = data.id
      
      // Detectar si es un pago de prueba
      const isTestPayment = paymentId === '123456' || 
                           paymentId.startsWith('test_') || 
                           paymentId.startsWith('TEST_') ||
                           paymentId.includes('test')
      
      if (isTestPayment) {
        // Para pagos de prueba, solo retornamos éxito
        return NextResponse.json({ 
          success: true, 
          message: 'Test payment processed successfully',
          test_payment: true
        })
      }
      
      // Procesar pagos reales
      const token = process.env.MERCADOLIBRE_TOKEN
      if (!token) {
        return NextResponse.json({ error: 'Token not configured' }, { status: 500 })
      }
      
      try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          return NextResponse.json({ error: 'Error al obtener información del pago' }, { status: 500 })
        }

        const payment = await response.json()
        const externalRef = payment.external_reference
        
        if (!externalRef) {
          return NextResponse.json({ error: 'No external reference found' }, { status: 400 })
        }
        
        const [raffleId, numbersStr, buyerId] = externalRef.split('|')
        const numbers = numbersStr.split(',').map(Number)

        const supabase = await createClient()

        // Verificar que la rifa existe
        const { data: raffle, error: raffleError } = await supabase
          .from('raffles')
          .select('id')
          .eq('id', raffleId)
          .single()

        if (raffleError || !raffle) {
          return NextResponse.json({ error: 'Raffle not found' }, { status: 404 })
        }

        if (payment.status === 'approved') {
          // Crear nuevos registros de tickets vendidos
          const ticketRecords = numbers.map((number: number) => ({
            raffle_id: raffle.id,
            number: number,
            is_sold: true,
            buyer_id: buyerId
          }))

          const { error: insertError } = await supabase
            .from('tickets')
            .insert(ticketRecords)

          if (insertError) {
            return NextResponse.json({ error: 'Error creating ticket records' }, { status: 500 })
          }
        }

        return NextResponse.json({ success: true })
      } catch (apiError) {
        return NextResponse.json({ error: 'API error' }, { status: 500 })
      }
    } else if (type === 'merchant_order') {
      // Los tickets se procesan solo con payment webhooks
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
