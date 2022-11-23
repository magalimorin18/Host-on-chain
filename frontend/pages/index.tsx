import { useEffect, useState } from "react";

import Button from "../components/Button";
import Room from "../components/Room";

export default function Home() {
  const [address, setAddress] = useState("");
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
          setAddress(accountAddress);
        }
      })
      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }

  const handleLogin = () => {
    connectMetamaskWallet();
  };

  if (address) return <Room address={address} />;
  return (
    <div className="flex flex-col justify-center items-center place-content-center text-center">
      <h1 className="text-6xl font-medium m-10">Host On Chain.</h1>
      <p className="text-2xl m-8 p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iste,
        asperiores voluptas molestias quos sed, commodi reprehenderit quod
        itaque cum officiis maiores. Dicta laborum esse inventore saepe quo
        dignissimos accusamus.
      </p>
      <Button title="Login to be able to donate" onClick={handleLogin} />
    </div>
  );
}
