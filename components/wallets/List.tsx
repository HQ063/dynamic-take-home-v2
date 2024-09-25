'use client'

import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { Button } from "../ui/button";
import { createWallet } from "@/app/actions/createWallet";
import { Loader, Plus, RefreshCcw } from "lucide-react";
import { EditableField } from "./EditableField";

export const List = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/wallets`, fetcher);

  return <>
    <h2 className="flex justify-between text-xl font-bold">Available Wallets</h2>
    {(isLoading || isValidating) && <p><Loader className="animate-spin inline-block" />Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    <table className="table-auto w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-4">Alias</th>
          <th className="py-4">Description</th>
          <th className="py-4">Address</th>
          <th className="py-4">Balance</th>
        </tr>
      </thead>
      <tbody className="bg-gray-50">
        {!error && !isLoading && data?.wallets && (
          data.wallets.map((wallet: any) => (
            <tr key={wallet.address} className="border-b border-gray-200 vertical-align-middle">
              <td className="py-3 px-3">
                <EditableField field='alias' wallet={wallet} mutate={mutate} />
              </td>
              <td className="py-3 px-3">
                <EditableField field='description' wallet={wallet} mutate={mutate} />
              </td>
              <td className="py-3 px-3 text-center">{wallet.address}</td>
              <td className="py-3 px-3 text-center">{wallet.balance}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <div className="flex align-center mt-4 gap-4">
      <Button onClick={() => mutate()}><RefreshCcw className="mr-2" /> Refresh</Button>
      <Button onClick={async () => {
        await createWallet()
        mutate()
      }}><Plus className="mr-2" />Create Wallet</Button>
    </div>
  </>
}