import { useState } from "react";
import { useAccount } from "wagmi";

import Button from "../Button";
import Input from "../Input";
import Label from "../Label";

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  balance: number;
  address: string;
}

const Room: React.FC = () => {
  const [, setDonation] = useState(0);
  const { address } = useAccount();

  const handleDonate = () => {
    alert(address);
  };

  const room: Room = {
    id: 1,
    name: "Cosy and warm room",
    description:
      "A room in a quite area. Provided with private bathroom and kitchen.",
    price: 100,
    balance: 20,
    image: "/images/room.jpg",
    address: "Berlin, Germany",
  };
  return (
    <div className="flex justify-center">
      <div className="block rounded-xl shadow-lg bg-white max-w-sm text-center mt-14 px-10">
        <div className="flex flex-col items-center p-3">
          <h5 className="text-gray-900 text-3xl font-bold subtitle m-5">
            {room.name}
          </h5>
          <img className="rounded-full" alt="presentation" src={room.image} />
          <p className="text-gray-700 text-base subtitle mt-6">
            {room.description}
          </p>
          <p className="m-3 border-b subtitle border-gray-300">
            {room.address}
          </p>
        </div>
        <div>
          <div className="p-1">
            <p className="subtitle text-center rounded-md font-medium">
              Targeted Amount : €{room.price}
            </p>
            <p className="subtitle text-center rounded-md font-medium">
              Amount collected : €{room.balance}
            </p>
          </div>

          <div className="md:flex md:items-center m-6">
            <div className="md:w-1/3 subtitle">
              <Label label={"Donation in €"} />
            </div>
            <div className="md:w-2/3 subtitle">
              <Input
                onChange={(e) => {
                  setDonation(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <Button title={"Donate"} onClick={handleDonate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
