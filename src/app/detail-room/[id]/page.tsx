import React from "react";
import Image from "next/image";
import ServiceCard from "@/components/service-card/services-card";
import FeatureCard from "@/components/feature-card/feature-card";

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

export default async function RoomDetail({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/getRoomById/${params.id}`
  ).then((res) => res.json());

  const [roomDetails, services] = response;

  return (
    <div className="flex flex-col w-full mb-4 lg:flex-row rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <div className="shrink-0">
        <Image
          src={"/loft.jpg"}
          alt={"roomDetails.category"}
          width={450}
          height={0}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <h2 className="mb-2 text-xl font-semibold">{roomDetails.category}</h2>
        <p className="mb-2 text-lg text-gray-600">${roomDetails.price}</p>
        {/* <p className="mb-4 text-lg text-gray-500">{roomDetails.description}</p> */}

        {/* <h3 className="text-lg font-semibold">Características:</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {roomDetails.features.map((feature: Feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.name}
              icon={feature.icon}
            />
          ))}
        </div> */}

        <h3 className="text-lg font-semibold">Servicios:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: Service) => (
            <ServiceCard
              key={service.id}
              type={service.type}
              price={service.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
