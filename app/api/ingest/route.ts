import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Mock ingestion endpoint placeholder' }, { status: 501 });
}
