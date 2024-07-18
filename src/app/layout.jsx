"use client";

import { VotingDappProvider } from "@/context";
import { Toaster } from "react-hot-toast";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#525252" />
        <meta name="theme-color" content="#ffffff" />
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
