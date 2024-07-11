import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

import { VotingDappProvider } from "../context/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <VotingDappProvider>
        <Component {...pageProps} />
        <Toaster />
      </VotingDappProvider>

      <script src="/assets/js/plugins/plugins.js" />
      <script src="/assets/js/plugins/plugin-custom.js" />
      <script src="/assets/js/main.js" />
    </>
  );
}
