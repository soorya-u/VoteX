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

      <script
        data-cfasync="false"
        src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
      />
      <script src="/assets/js/plugins/plugins.js" />
      <script src="/assets/js/plugins/plugin-custom.js" />
      <script src="/assets/js/main.js" />
    </>
  );
}
