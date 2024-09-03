import { Leaf } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  images: string[];
  features: { id: string; name: string }[];
  reservations: {
    id: string;
    price: number;
    startDate: string;
    status: string;
    endDate: string;
    guestName1?: string;
    guestLastName1?: string;
    guestName2?: string;
    guestLastName2?: string;
    guestName3?: string;
    guestLastName3?: string;
    guestName4?: string;
    guestLastName4?: string;
  }[];
}

const AllRoomCard: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full mb-4 rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
        <div className=" flex flex-row ">
          <div className=" flex flex-row ">
            {room?.images && (
              <Image
                src={room.images[0]}
                alt={room.category}
                width={600}
                height={0}
                className="rounded-lg "
              />
            )}
          </div>
          <div className="ml-5 flex flex-col">
            <div className="mt-5 flex flex-col">
              <h2 className="text-xl font-semibold uppercase m-2">
                {room.category}
              </h2>
              <p className="text-lg text-black font-semibold m-2">
                $ {room.price}
              </p>
              <h2 className="text-xl font-semibold text-gray-600 m-2">
                Habitación Nro. {room.number}
              </h2>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold m-2">Características:</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {room.features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex size-20 flex-col items-center rounded-md border text-black"
                  >
                    <Leaf className="m-2 size-4" />

                    <h1 className="mt-2 text-xs">{feature.name}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomCard;
