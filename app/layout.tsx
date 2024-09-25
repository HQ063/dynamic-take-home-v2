import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProviderWrapper from "@/components/provider-wrapper";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const session = await auth()
  return (
    <html lang="en">
        <body className={inter.className}>
          <ProviderWrapper>
            <SessionProvider session={session}>

              <div className="flex flex-col justify-between w-full h-full min-h-screen">
                <Header />
                <main className="flex-auto w-full max-w-7xl px-4 py-4 mx-auto sm:px-6 md:py-6">
                  {children}
                </main>
                <Footer />
              </div>
            </SessionProvider>
          </ProviderWrapper>
        </body>
    </html>
  );
}
