import { Address, createPublicClient, createWalletClient, http } from "viem"
import { sql } from "./sql"
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { getUserEmail } from "./utils";

export const getWalletAccess = async (address: Address, includePrivateKey: boolean = false) => {
  const email = await getUserEmail()

  // Search for the wallet in the wallet_access table
  const result = includePrivateKey ? await sql`
    SELECT * FROM wallet_access
    INNER JOIN wallets ON wallet_access.address = wallets.address
    WHERE wallet_access.address = ${address}
    AND wallet_access.user_email = ${email}
    AND (
      'owner' = ANY(wallet_access.access_rights)
      OR 'signer' = ANY(wallet_access.access_rights)
    )
  ` : await sql`
    SELECT * FROM wallet_access
    WHERE wallet_access.address = ${address}
    AND wallet_access.user_email = ${email}
  `

  if (result.length === 0) {
    throw new Error('Wallet not found or not authorized for this user')
  }
  return result[0]
}

export const getWalletClient = async (address: Address) => {
  const walletAccess = await getWalletAccess(address, true);
  return createWalletClient({
    chain: sepolia,
    transport: http(),
    account: privateKeyToAccount(walletAccess.private_key),
  })
}

export const publicClient = createPublicClient({ 
  chain: sepolia,
  transport: http()
})
