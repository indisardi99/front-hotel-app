"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  Wifi,
  Dumbbell,
  Leaf,
  Lock,
  Tv,
  BedDouble,
} from "lucide-react";
import { RoomCardProps, ServicesProps } from "@/lib/interfaces";
import { useCart } from "@/app/context/cart-context";
import { Wind, Droplet } from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  wifi: <Wifi className="m-2 size-4" />,
  gimnasio: <Dumbbell className="m-2 size-4" />,
  seguro: <Lock className="m-2 size-4" />,
  tv: <Tv className="m-2 size-4" />,

  cama: <BedDouble className="m-2 size-4" />,
  balcon: <Wind className="m-2 size-4" />,
  jacuzzi: <Droplet className="m-2 size-4" />,
};

const getIcon = (title: string) => {
  const lowerCaseTitle = title.toLowerCase();

  if (lowerCaseTitle.includes("wifi")) return iconMap.wifi;
  if (lowerCaseTitle.includes("gimnasio")) return iconMap.gimnasio;
  if (lowerCaseTitle.includes("seguro")) return iconMap.seguro;
  if (lowerCaseTitle.includes("tv")) return iconMap.tv;
  if (lowerCaseTitle.includes("cama")) return iconMap.cama;
  if (lowerCaseTitle.includes("balcón")) return iconMap.balcon;
  if (lowerCaseTitle.includes("jacuzzi")) return iconMap.jacuzzi;

  return <Leaf className="m-2 size-4" />;
};

const Services: React.FC<ServicesProps> = ({ id, title }) => {
  return (
    <div className="flex size-20 flex-col items-center rounded-md border text-black">
      <h1 className="mt-2 text-xs">{title}</h1>
      <h1>{getIcon(title)}</h1>
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
    <div className="flex flex-col mt-5 w-full mb-4 lg:flex-row rounded-lg bg-[#faf9f5] border border-orange-300 p-4 gap-4">
      <div className="shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          width={450}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="ml-5 flex flex-1 flex-col">
        <h2 className="mb-2 text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mb-2 text-lg text-orange-500 font-semibold">$ {price}</p>
        <p className="mb-4 text-lg text-gray-500">{`Habitación número ${number} con las siguientes características:`}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {services.map((service) => (
            <Services key={service.id} id={service.id} title={service.title} />
          ))}
        </div>
        <Button
          className="bg-[#faf9f5] font-semibold border shadow-md border-orange-300 text-orange-600 hover:bg-orange-100 mt-auto w-32 self-end p-2 rounded-lg transition-all duration-300"
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
