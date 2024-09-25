'use server'

import { Address, parseEther } from 'viem'
import { getWalletAccess, getWalletClient } from '@/lib/wallet';
import { sql } from '@/lib/sql';

export const shareWallet = async (wallet: Address, alias: string, description: string, email: string, access_rights: string[]) => {
  const walletAccess = await getWalletAccess(wallet, true)
  
  if(!walletAccess.access_rights.includes('owner')) {
    throw new Error('Not authorized!')
  }

  try {
    await sql`INSERT INTO wallet_access(address, user_email, alias, description, access_rights) VALUES(${wallet}, ${email}, ${alias}, ${description}, ${access_rights})`;
  } catch (error) {
    console.error('Error sharing wallet:', error);
    throw new Error('Failed to share wallet. Please try again.');
  }
}