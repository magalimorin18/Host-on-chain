import Link from "next/link";
import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import Logout from "./components/Logout/Logout";

const Header: React.FC = () => {
  const [user] = useContext(UserContext);

  return (
    <header className="mb-5">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center max-w-screen-xl">
          <Link href="/" className="flex items-center left-0">
            <span className="text-xl font-semibold whitespace-nowrap">
              HOST ON CHAIN
            </span>
          </Link>
          <div className="flex items-center">{user && <Logout />}</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
