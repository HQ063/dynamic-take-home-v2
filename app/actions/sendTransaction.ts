'use server'

import { Address, parseEther } from 'viem'
import { getWalletClient } from '@/lib/wallet';

export const sendTransaction = async (wallet: Address, to: Address, amount: string | number) => {
  const client = await getWalletClient(wallet)

  const tx = await client.sendTransaction({
    to: to,
    value: parseEther(amount.toString()),
  })

  return tx;
}