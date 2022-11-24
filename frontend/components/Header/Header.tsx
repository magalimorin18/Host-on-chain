import Link from "next/link";
import { useAccount } from "wagmi";

import Logout from "./components/Logout/Logout";

const Header: React.FC = () => {
  const { address } = useAccount();

  return (
    <header className="mb-5">
      <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center max-w-screen-xl">
          <Link href="/" className="flex items-center left-0">
            <span className="subtitle text-[#9B869C] text-lg font-bold whitespace-nowrap">
              host on chain
            </span>
          </Link>
          <div className="flex items-center">{address && <Logout />}</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
