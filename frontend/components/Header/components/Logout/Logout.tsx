import { useDisconnect } from "wagmi";

import Button from "../../../Button";

const Logout: React.FC = () => {
  const { disconnect } = useDisconnect();
  return (
    <Button
      title="Logout"
      onClick={() => disconnect()}
      style={"text-white subtitle"}
    />
  );
};

export default Logout;
