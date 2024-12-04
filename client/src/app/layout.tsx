import { Outfit } from "next/font/google";

import { defaultMetadata } from "@/constants/metadata";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

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
      <Providers>
        <body
          className={`${outfit.className} flex flex-col bg-img text-secondary min-h-screen`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
