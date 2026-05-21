import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Scores endpoint placeholder' }, { status: 501 });
}
