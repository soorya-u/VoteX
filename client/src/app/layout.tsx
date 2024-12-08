import { Outfit } from "next/font/google";

import { defaultMetadata } from "@/constants/metadata";

import Header from "@/components/custom/Header";

import Providers from "@/providers";

import "./globals.css";

export const metadata = defaultMetadata;

const outfit = Outfit({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} flex flex-col bg-img text-secondary min-h-screen`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
