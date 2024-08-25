import React from "react";
import Image from "next/image";
import ServiceCard from "@/components/service-card/services-card";
import { CalendarIcon, Wifi, Dumbbell, Leaf, Lock, Tv } from "lucide-react";

interface Feature {
  id: string;
  name: string;
  icon: string;
}

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: Feature[];
  imageUrl: string;
  description: string;
}

interface Service {
  id: string;
  price: number;
  type: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <CalendarIcon className="m-2 size-4" />,
  wifi: <Wifi className="m-2 size-4" />,
  dumbbell: <Dumbbell className="m-2 size-4" />,
  leaf: <Leaf className="m-2 size-4" />,
  lock: <Lock className="m-2 size-4" />,
  tv: <Tv className="m-2 size-4" />,
};

export default async function RoomDetail({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/getRoomById/${params.id}`,
    { next: { revalidate: 1 } }
  ).then((res) => res.json());

  const [roomDetails, services] = response;

  return (
    <div className="flex flex-col w-full mb-4 lg:flex-row rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <div className="shrink-0">
        {roomDetails?.images && (
          <Image
            src={roomDetails.images[0]}
            alt={roomDetails.category}
            width={450}
            height={0}
            className="bg-red-500rounded-lg object-cover"
          />
        )}
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <h2 className="mb-2 text-xl font-semibold">{roomDetails.category}</h2>
        <p className="mb-2 text-lg text-gray-600">${roomDetails.price}</p>
        <p className="mb-4 text-lg text-gray-500">{roomDetails.description}</p>

        <h3 className="text-lg font-semibold">Características:</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {roomDetails.features.map((feature: Feature) => (
            <div
              key={feature.id}
              className="flex size-20 flex-col items-center rounded-md border text-black"
            >
              {iconMap[feature.icon] || <Leaf className="m-2 size-4" />}{" "}
              <h1 className="mt-2 text-xs">{feature.name}</h1>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold">Servicios:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: Service) => (
            <ServiceCard
              key={service.id}
              type={service.type}
              price={service.price}
              icon={iconMap[service.type] || <Leaf className="m-2 size-4" />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
