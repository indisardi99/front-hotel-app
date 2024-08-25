"use client";
import { CalendarIcon, Wifi, Dumbbell, Leaf, Lock, Tv } from "lucide-react";
import Image from "next/image";
import ServiceCard from "@/components/service-card/services-card";
import { Feature, Service } from "@/lib/interfaces";
import Summary from "../resume/resume";

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <CalendarIcon className="m-2 size-4" />,
  wifi: <Wifi className="m-2 size-4" />,
  dumbbell: <Dumbbell className="m-2 size-4" />,
  leaf: <Leaf className="m-2 size-4" />,
  lock: <Lock className="m-2 size-4" />,
  tv: <Tv className="m-2 size-4" />,
};

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: Feature[];
  images: string[];
  description: string;
}

const RoomDetails: React.FC<{ room: Room; services: Array<Service> }> = ({
  room,
  services,
}) => {
  const additionalItems = [
    { name: "Breakfast", price: 20.0 },
    { name: "Spa Access", price: 50.0 },
    { name: "Late Checkout", price: 30.0 },
  ];

  const handleContinue = () => {
    alert("Continuing to reservation...");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full mb-4 rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <div className="flex-1 mb-4 lg:mb-0 lg:mr-4">
        <div className="flex flex-col">
          <div className="shrink-0">
            {room?.images && (
              <Image
                src={room.images[0]}
                alt={room.category}
                width={450}
                height={0}
                className="rounded-lg object-cover"
              />
            )}
          </div>
          <div className="ml-5 flex flex-1 flex-col">
            <h2 className="mb-2 text-xl font-semibold">{room.category}</h2>
            <p className="mb-2 text-lg text-gray-600">${room.price}</p>
            <p className="mb-4 text-lg text-gray-500">{room.description}</p>

            <h3 className="text-lg font-semibold">Características:</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {room.features.map((feature: Feature) => (
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
            <div className="flex max-w-52 max-h-32">
              {services.map((service: Service) => (
                <ServiceCard
                  key={service.id}
                  type={service.type}
                  price={service.price}
                  icon={
                    iconMap[service.type] || <Leaf className="m-2 size-4" />
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3">
        <Summary
          title={room.category}
          basePrice={room.price}
          additionalItems={additionalItems}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default RoomDetails;
