"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CalendarIcon, Wifi, Dumbbell, Leaf, Lock, Tv } from "lucide-react";
import { RoomCardProps, ServicesProps } from "@/lib/interfaces";
import { useCart } from "@/app/context/cart-context";

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <CalendarIcon className="m-2 size-4" />,
  wifi: <Wifi className="m-2 size-4" />,
  dumbbell: <Dumbbell className="m-2 size-4" />,
  leaf: <Leaf className="m-2 size-4" />,
  lock: <Lock className="m-2 size-4" />,
  tv: <Tv className="m-2 size-4" />,
};

const Services: React.FC<ServicesProps> = ({ title, icon }) => {
  return (
    <div className="flex size-20 flex-col items-center rounded-md border text-black">
      <h1 className="mt-2 text-xs">{title}</h1>
      <h1>{iconMap[icon]}</h1>
    </div>
  );
};

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  imageUrl,
  title,
  price,
  number,
  services,
}) => {
  const router = useRouter();
  const { updateReserve, reserve } = useCart();

  const handleViewDetails = () => {
    updateReserve({
      ...reserve,
      roomId: id,
      roomPrice: price,
      category: title,
    });
    router.push(`/detail-room/${id}`);
  };

  return (
    <div className="flex flex-col w-full mb-4 lg:flex-row rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <div className="shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          width={450}
          height={0}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="mb-2 text-lg text-gray-600">$ {price}</p>
        <p className="mb-4 text-lg text-gray-500">{`Habitación número ${number} con las siguientes características:`}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {services.map((service) => (
            <Services key={service.id} {...service} />
          ))}
        </div>
        <Button
          className="bg-[#faf9f5] border border-orange-300 mt-auto w-32 self-end p-2"
          variant="outline"
          onClick={handleViewDetails}
        >
          Ver detalle
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
