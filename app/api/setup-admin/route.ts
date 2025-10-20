import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Buscar el usuario por email
    const { data: profile, error: findError } = await supabase
      .from('profiles')
      .select('id, email, is_admin')
      .eq('email', email)
      .single()

    if (findError) {
      return NextResponse.json({ 
        error: 'Usuario no encontrado. Asegúrate de estar registrado primero.' 
      }, { status: 404 })
    }

    // Actualizar el usuario para que sea administrador
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', profile.id)
      .select()

    if (error) {
      return NextResponse.json({ 
        error: 'Error al actualizar permisos: ' + error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Usuario configurado como administrador',
      user: data[0]
    })

  } catch (error) {
    console.error('Error in setup-admin API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


