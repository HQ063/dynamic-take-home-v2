import { Address, createPublicClient, http } from "viem"
import { sql } from "./sql"
import { sepolia } from "viem/chains";
import { getUserEmail } from "./utils";

export const getWalletAccess = async (address: Address) => {
  const email = await getUserEmail()

  // Search for the wallet in the wallet_access table
  const result = await sql`
    SELECT * FROM wallet_access
    WHERE wallet_access.address = ${address}
    AND wallet_access.user_email = ${email}
  `

  if (result.length === 0) {
    throw new Error('Wallet not found or not authorized for this user')
  }
  return result[0]
}

export const publicClient = createPublicClient({ 
  chain: sepolia,
  transport: http()
})
