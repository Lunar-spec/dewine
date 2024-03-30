import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "De-Wine",
  description: "Taste the divinity of the North",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
