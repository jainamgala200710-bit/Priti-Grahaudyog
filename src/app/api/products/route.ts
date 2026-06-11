import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    let query = supabase.from('products').select('*, categories(*)')

    if (category) query = query.eq('category_id', category)
    if (featured === 'true') query = query.eq('is_featured', true)
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)

    query = query.eq('is_available', true).order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err) {
    console.error('Products GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('products')
      .insert(body)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('Products POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
