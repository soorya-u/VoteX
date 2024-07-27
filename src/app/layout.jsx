import { Toaster } from "react-hot-toast";

import { VotingDappProvider } from "@/context";
import { defaultMetadata } from "@/constants/metadata";

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
        <VotingDappProvider>
          {children}
          <Toaster />
        </VotingDappProvider>
      </body>
    </html>
  );
}
