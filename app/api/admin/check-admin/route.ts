import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Verificar si el usuario es administrador
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error checking admin status:', error)
      return NextResponse.json({ error: 'Error checking admin status' }, { status: 500 })
    }

    return NextResponse.json({ 
      isAdmin: profile?.is_admin || false 
    })

  } catch (error) {
    console.error('Error in check-admin API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


