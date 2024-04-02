import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthProvider from "@/components/shared/Provider/AuthProvider";

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
        <AuthProvider>
          <main>{children}</main>
        <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
