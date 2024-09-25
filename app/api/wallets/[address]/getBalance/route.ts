import { NextRequest, NextResponse } from 'next/server';
import { Address, formatEther } from 'viem';

import { publicClient, getWalletAccess } from '@/lib/wallet';

export async function GET(
  _request: NextRequest,
  { params }: { params: { address: string } }
) {
  const address = params.address as Address;

  await getWalletAccess(address);

  try {
    const balance = await publicClient.getBalance({ address });
    const formattedBalance = Number.parseFloat(formatEther(balance));

    return NextResponse.json({ balance: formattedBalance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ message: "Error fetching balance" }, { status: 500 });
  }
}
