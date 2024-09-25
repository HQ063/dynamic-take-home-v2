'use client'

import { FC } from "react"
import { Button } from "../ui/button"
import { KeyedMutator } from "swr"
import { updateWallet } from "@/app/actions/updateWallet"
import { Edit } from "lucide-react"

type Props = {
  wallet: any
  field: 'alias' | 'description'
  mutate: KeyedMutator<any>
}

export const EditableField : FC<Props> = ({ wallet, field, mutate }) => {
  const askForUpdate = async (wallet: any) => {
    const result = prompt(`Enter new ${field}`, wallet[field])
    if (result) {
      wallet[field] = result
      await updateWallet(wallet.address, wallet.alias, wallet.description)
      mutate()
    }
  }

  return <>
    <span className="h-10 items-center inline-flex">{wallet[field]}</span>
    <Button className="float-right" size={'sm'} onClick={() => askForUpdate(wallet)}><Edit size={16} /></Button>
  </>
}