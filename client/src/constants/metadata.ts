import { Metadata } from "next";

const domain =
  process.env.NEXT_PUBLIC_URL || "https://democrachain.soorya-u.dev";

export const defaultMetadata: Metadata = {
  title: "DemocraChain",
  applicationName: "DemocraChain",
  icons: {
    apple: {
      url: `${domain}/apple-touch-icon.png`,
      sizes: "180x180",
    },
    icon: [
      {
        url: `${domain}/favicon-16x16.png`,
        sizes: "16x16",
      },
      {
        url: `${domain}/favicon-32x32.png`,
        sizes: "32x32",
      },
    ],
  },
  authors: [
    {
      name: "Soorya U",
      url: "https://soorya-u.dev",
    },
    {
      name: "Saanvi MJ",
      url: "https://saanvi-mj.github.io",
    },
  ],
  metadataBase: new URL("https://democrachain.soorya-u.dev"),
  appleWebApp: {
    title: "DemocraChain",
    statusBarStyle: "default",
    startupImage: `${domain}/apple-touch-icon.png`,
  },
  manifest: `${domain}/site.webmanifest`,
};
