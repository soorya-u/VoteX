import { defaultMetadata } from "@/constants/metadata";
import Providers from "@/providers";

import "./globals.css";

export const metadata = {
  title: "DemocraChain",
  description:
    "Democrachain is a secure and transparent decentralized voting system built on the Stellar blockchain which empowers communities to make decisions collectively with confidence.",
  ...defaultMetadata,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
