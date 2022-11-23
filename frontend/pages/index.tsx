import { MetaMaskInpageProvider } from "@metamask/providers";
import { useEffect, useState } from "react";

import Button from "../components/Button";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function Home() {
  const [user, setUser] = useState<string>("");

  const [, setIsMetamaskInstalled] = useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetamaskInstalled(true);
    }
  }, []);

  async function connectMetamaskWallet(): Promise<void> {
    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        const accountAddress = accounts[0];
        if (accountAddress) {
          setUser(accountAddress);
        }
      })
      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }

  return (
    <div className="flex flex-col justify-center items-center place-content-center text-center">
      <h1 className="text-6xl font-medium m-10">Host On Chain.</h1>
      <p className="text-2xl m-8 p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iste,
        asperiores voluptas molestias quos sed, commodi reprehenderit quod
        itaque cum officiis maiores. Dicta laborum esse inventore saepe quo
        dignissimos accusamus.
      </p>
      {!user ? (
        <Button
          title="Donate Now"
          onClick={() => connectMetamaskWallet()}
          style="text-lg px-8 py-4 text-black-800 font-semibold rounded-full border border-purple-200  hover:bg-purple-100 hover:border-transparent "
        />
      ) : (
        <p>You are logged in with the address {user}</p>
      )}
    </div>
  );
}
