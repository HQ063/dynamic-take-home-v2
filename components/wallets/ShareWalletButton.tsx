import { FC } from "react"
import { Button } from "../ui/button"
import { Share } from "lucide-react"
import { shareWallet } from "@/app/actions/shareWallet"

type Props = {
  wallet: any
}

const isValidMail = (address: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)

export const ShareWalletButton : FC<Props> = ({ wallet }) => {
  const askForShare = async (wallet: any) => {
    let address = prompt("Enter the recipient's email address:");
    while(address && !isValidMail(address)) {
      address = prompt("Invalid email address. Enter the recipient's email address:");
    }
    if(!address) { 
      alert('Share cancelled.')
      return
    }
    const signAccess = confirm(`Do you want to allow ${address} to sign transactions?`)
    await shareWallet(wallet.address, wallet.alias, wallet.description, address, signAccess ? ['signer'] : ['reader'])
    alert('Wallet shared!')
  }

  return <Button size={'sm'} onClick={() => askForShare(wallet)}><Share size={16} /></Button>
}