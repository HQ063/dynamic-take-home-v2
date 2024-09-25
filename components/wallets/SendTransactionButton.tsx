import { FC } from "react"
import { Button } from "../ui/button"
import { Send } from "lucide-react"
import { sendTransaction } from "@/app/actions/sendTransaction"
import { Address } from "viem"
import { KeyedMutator } from "swr"

type Props = {
  wallet: any
  mutate: KeyedMutator<any>
}

const isValidAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

export const SendTransactionButton : FC<Props> = ({ wallet, mutate }) => {
  const askForSend = async (wallet: any) => {
    let address = prompt("Enter the recipient's address:");
    while(address && !isValidAddress(address)) {
      address = prompt("Invalid Ethereum address. Enter the recipient's address:", address);
    }
    const amount = prompt("Enter the amount to send:");

    if (address && amount) {
      const tx = await sendTransaction(wallet.address, address as Address, amount);
      mutate()
      console.log(`Sent ${amount} from ${wallet.address} to ${address} with tx ${tx}`);
      alert('sent!')
    } else {
      alert("Transaction cancelled. Address and amount are required.");
    }
  }

  return <Button className="mr-2" size={'sm'} onClick={() => askForSend(wallet)}><Send size={16} /></Button>
}