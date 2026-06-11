import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('enquiries')
      .select('*, products(id, name, slug, image, price)')

    if (status) query = query.eq('status', status)

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err) {
    console.error('Enquiries GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    if (!body.customer_name || typeof body.customer_name !== 'string' || body.customer_name.trim() === '') {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 })
    }

    if (!body.phone || typeof body.phone !== 'string' || body.phone.trim() === '') {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // Set default status for new enquiries
    const enquiryData = {
      ...body,
      status: body.status || 'new',
    }

    const { data, error } = await supabase
      .from('enquiries')
      .insert(enquiryData)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('Enquiries POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
