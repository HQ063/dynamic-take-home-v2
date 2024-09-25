'use client'

import { useEffect } from "react";
import { DynamicWidget, useDynamicContext } from "../lib/dynamic";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";

export default  function Header() {
  const { data: session, status } = useSession();
  const { user, sdkHasLoaded, handleLogOut } = useDynamicContext();
  useEffect(() => {
    if (sdkHasLoaded && status !== 'loading' && !user && session?.user) {
      signOut();
    }
  }, [user, session]);

  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <DynamicWidget />

        {session?.user?.email && <Button onClick={async() => {
          handleLogOut()
          signOut()
        }}>Sign Out</Button>}
      </div>
    </header>
  );
}
