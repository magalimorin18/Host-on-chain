import { useContext, useState } from "react";

import { UserContext } from "../../contexts/UserContext";
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
  const [user] = useContext(UserContext);
  const [donation, setDonation] = useState(0);

  const handleDonate = () => {
    console.log("clicked on donate");
  };

  const room: Room = {
    id: 1,
    name: "Room 1",
    description: "Room 1 description",
    price: 100,
    balance: 20,
    image: "/images/room.jpg",
    address: "Berlin, Gerrmany",
  };
  return (
    <div className="flex justify-center">
      <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
        <div className="flex flex-col items-center p-3">
          <img className="rounded-full" alt="presentation" src={room.image} />
          <p className="m-3 border-b border-gray-300">{room.address}</p>
        </div>
        <div className="p-5">
          <h5 className="text-gray-900 text-xl font-medium">{room.name}</h5>
          <p className="text-gray-700 text-base">{room.description}</p>
          <div className="p-5">
            <p className="italic text-center rounded-md">
              Targetted Amount : {room.price}
            </p>
            <p className="italic text-center rounded-md">
              Amount collected : {room.balance}
            </p>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <Label label={"Donation in €"} />
            </div>
            <div className="md:w-2/3">
              <Input
                onChange={(e) => {
                  setDonation(parseInt(e.target.value));
                }}
              />
            </div>
          </div>

          <Button title={"Donate"} onClick={handleDonate} />
        </div>
      </div>
    </div>
  );
};

export default Room;
