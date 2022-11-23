import "../styles/globals.scss";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import Header from "../components/Header";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={client}>
        <Header />
        <div className="h-screen">
          <Component {...pageProps} />
        </div>
      </WagmiConfig>
    </>
  );
}
