import { FC } from "react"
import { Button } from "../ui/button"
import { FileSignature } from "lucide-react"
import { signMessage } from "@/app/actions/signMessage"
import { KeyedMutator } from "swr"

type Props = {
  wallet: any
  mutate: KeyedMutator<any>
}

export const SignMessageButton : FC<Props> = ({ wallet, mutate }) => {
  const askForSign = async (wallet: any) => {
    const message = prompt("Enter the message to sign")
    if (message) {
      const signature = await signMessage(wallet.address, message);
      alert(`Signed message: ${signature}`)
    }
  }

  return <Button className="mr-2" size={'sm'} onClick={() => askForSign(wallet)}><FileSignature size={16} /></Button>
}