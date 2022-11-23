import "../styles/globals.scss";
import "../styles/tailwind.css";
import { getDefaultProvider } from "ethers";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";

import Header from "../components/Header";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
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
