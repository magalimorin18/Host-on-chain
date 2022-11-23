import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import Button from "../components/Button";
import Room from "../components/Room";

export default function Home() {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (address) return <Room />;
  return (
    <div className="flex flex-col justify-center items-center place-content-center text-center">
      <h1 className="text-6xl font-medium m-10">Host On Chain.</h1>
      <p className="text-2xl m-8 p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iste,
        asperiores voluptas molestias quos sed, commodi reprehenderit quod
        itaque cum officiis maiores. Dicta laborum esse inventore saepe quo
        dignissimos accusamus.
      </p>
      <Button title="Login to Donate" onClick={() => connect()} />
    </div>
  );
}
