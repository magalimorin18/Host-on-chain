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
      <img
        src="/logo.png"
        alt="Logo Host On Chain"
        style={{ width: 90, marginTop: "6rem" }}
      />
      <h1 className="subtitle font-bold text-8xl mt-10 m-6">
        Help Someone To Get A Bed,
        <br /> And Get On Chain Proof <br />
      </h1>
      <p className="subtitle text-4xl font-bold px-10 mx-10 mb-9">
        We use donations to help refugees and homeless to a night of sleep.{" "}
        <br /> And we can proof it, <i>on chain</i>.
      </p>

      {!user ? (
        <Button
          title="Donate Now"
          onClick={() => connectMetamaskWallet()}
          style="subtitle text-3xl px-8 py-4 text-black-800 font-semibold rounded-full border border-purple-200  hover:bg-purple-100 hover:border-transparent "
        />
      ) : (
        <p>You are logged in with the address {user}</p>
      )}
    </div>
  );
}
