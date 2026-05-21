import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Discord alert endpoint placeholder' }, { status: 501 });
}
