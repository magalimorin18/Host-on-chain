import { useContext } from "react";

import { UserContext } from "../../../../contexts/UserContext";
import Button from "../../../Button";

const Logout: React.FC = () => {
  const [, setUser] = useContext(UserContext);

  const logoutUser = () => {
    setUser(null);
  };

  return <Button title="Logout" onClick={logoutUser} />;
};

export default Logout;
