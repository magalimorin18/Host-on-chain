import "../styles/globals.scss";
import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Header />
        <div className="h-screen">
          <Component {...pageProps} />
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
}
