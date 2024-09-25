import { NextRequest, NextResponse } from 'next/server';
import { sendTransaction } from '@/app/actions/sendTransaction';
import { Address } from 'viem';

export async function POST(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  const { to, amount } = await request.json();

  if (!to || !amount) {
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }

  try {
    const result = await sendTransaction(address as Address, to as Address, amount);
    return NextResponse.json({ transactionHash: result });
  } catch (error) {
    if(error instanceof Error && error.message === 'Not authenticated') {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    console.error('Error sending transaction:', error);
    return NextResponse.json({ error, message: "Error sending transaction" }, { status: 500 });
  }
}

