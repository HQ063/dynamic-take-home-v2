'use server'

import { Address } from 'viem'
import { getWalletClient } from '@/lib/wallet';

export const signMessage = async (wallet: Address, message: string) => {
  const client = await getWalletClient(wallet)

  const tx = await client.signMessage({
    message
  })

  return tx;
}