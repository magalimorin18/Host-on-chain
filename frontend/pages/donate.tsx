import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Input } from "postcss";
import { useContext, useState } from "react";

import Button from "../components/Button";
import Label from "../components/Label";
import { UserContext } from "../contexts/UserContext";

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  balance: number;
  address: string;
}

const Donate: NextPage = () => {
  const [user] = useContext(UserContext);
  const router = useRouter();
  const [donation, setDonation] = useState(0);

  const handleLogin = () => {
    router.push("/");
  };

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

  //   if (!user) {
  //     return (
  //       <div className="flex items-center flex-col">
  //         <p>Error: You need to be logged in to be able to donate</p>
  //         <Button
  //           title={"Click here to be redirected to Login page"}
  //           onClick={handleLogin}
  //         />
  //       </div>
  //     );
  //   }

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
              Price : {room.price}
            </p>
            <p className="italic text-center rounded-md">
              Already donated : {room.balance}
            </p>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <Label label={"Profile Name"} />
            </div>
            <div className="md:w-2/3">
              <Input
                onChange={(e) => {
                  setDonation(e.target.value);
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

export default Donate;
