import { createWallet } from "@/app/actions/createWallet";
import { sql } from "@/lib/sql";
import { getUserEmail } from "@/lib/utils";
import { publicClient } from "@/lib/wallet";
import { formatEther } from 'viem'


export const GET = async (req: Request) => {
  const email = await getUserEmail();

  const walletsData = await sql`SELECT * FROM wallet_access WHERE user_email = ${email} order by created_at asc`;

  if (walletsData) {
    const wallets = await Promise.all(walletsData.map(async (wallet: any) => (
      { ...wallet, balance: formatEther(await publicClient.getBalance({ address: wallet.address })) }
    )))
    return Response.json({ wallets });
  } else {
    return Response.json({ message: "No wallet found" }, { status: 404 });
  }
}