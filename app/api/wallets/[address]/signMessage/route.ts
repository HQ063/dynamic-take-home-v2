import { NextRequest, NextResponse } from 'next/server';
import { signMessage } from '@/app/actions/signMessage';
import { Address } from 'viem';

export async function POST(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  const { msg } = await request.json();

  if (!msg) {
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }

  try {
    const result = await signMessage(address as Address, msg);
    return NextResponse.json({ signedMessage: result });
  } catch (error) {
    if(error instanceof Error && error.message === 'Not authenticated') {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    console.error('Error sending transaction:', error);
    return NextResponse.json({ error, message: "Error signing message" }, { status: 500 });
  }
}

