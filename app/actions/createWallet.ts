'use server'

import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { sql } from '@/lib/sql';
import { getUserEmail } from '@/lib/utils';

export const createWallet = async () => {
  const email = await getUserEmail();
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  const alias = `Wallet ${account.address.slice(0, 6)}`;

  try {
      await sql.transaction([
        sql`INSERT INTO wallets (address, private_key) VALUES (${account.address}, ${privateKey})`,
        sql`
            INSERT INTO wallet_access (address, user_email, alias, access_rights)
            VALUES (${account.address}, ${email}, ${alias}, ${['owner']})
        `
      ]);

      console.log('Wallet created successfully and access granted');
      return { address: account.address, alias: alias, balance: '0' };
  } catch (error) {
      console.error('Error creating wallet:', error);
      throw new Error('Failed to create wallet');
  }
}