'use client'

import ClientExample from "@/components/client-example";
import { useSession } from "next-auth/react";
import { List } from "@/components/wallets/List";

export default function Index() {
  const { data: session } = useSession()

  return (
    <>
      <ClientExample />
      {session?.user && <List />}
    </>
  );
}
