"use client";

import { VotingDappProvider } from "@/context";
import { Toaster } from "react-hot-toast";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="/assets/js/plugins/plugins.js" />
        <script src="/assets/js/plugins/plugin-custom.js" />
        <script src="/assets/js/main.js" />
      </head>
      <body>
        <VotingDappProvider>
          {children}
          <Toaster />
        </VotingDappProvider>
      </body>
    </html>
  );
}
