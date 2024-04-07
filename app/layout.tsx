import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "De-Wine",
  description: "Taste the divinity of the North",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={jost.className}>
        <SessionProvider session={session}>
          <main>{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
