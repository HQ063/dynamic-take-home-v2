import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <Header />
          <main>{children}</main>
        <Footer />
      </SessionProvider>
    </>
  );
}
