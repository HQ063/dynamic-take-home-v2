'use server'

import { sql } from '@/lib/sql';
import { getUserEmail } from '@/lib/utils';

export const updateWallet = async (address: string, alias: string, description: string) => {
  const email = await getUserEmail();

  try {
      await sql`UPDATE wallet_access SET alias = ${alias}, description = ${description} WHERE address = ${address} AND user_email = ${email}`;
      console.log('Wallet updated');
  } catch (error) {
      console.error('Error creating wallet:', error);
      throw new Error('Failed to create wallet');
  }
}