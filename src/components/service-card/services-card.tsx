import React from "react";
import {
  Wifi,
  Dumbbell,
  Leaf,
  Lock,
  Martini,
  Sparkles,
  Utensils,
} from "lucide-react";

const iconMap: { [key: string]: React.ReactNode } = {
  wifi: <Wifi className="m-2 size-4" />,
  gimnasio: <Dumbbell className="m-2 size-4" />,
  ecológico: <Leaf className="m-2 size-4" />,
  seguro: <Lock className="m-2 size-4" />,
  breackfast: <Utensils className="m-2 size-4" />,
  spa: <Sparkles className="m-2 size-4" />,
  Bar: <Martini className="m-2 size-4" />,
};

const getIcon = (name: string) => {
  const lowerCaseName = name.toLowerCase();

  if (lowerCaseName.includes("wifi")) return iconMap.wifi;
  if (lowerCaseName.includes("gimnasio")) return iconMap.gimnasio;
  if (lowerCaseName.includes("ecológico")) return iconMap.ecológico;
  if (lowerCaseName.includes("seguro")) return iconMap.seguro;
  if (lowerCaseName.includes("breackfast")) return iconMap.breackfast;
  if (lowerCaseName.includes("spa")) return iconMap.spa;
  if (lowerCaseName.includes("bar")) return iconMap.Bar;

  return <Leaf className="m-2 size-4" />;
};

interface ServiceCardProps {
  name: string;
  price: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, price }) => {
  return (
    <div className="min-w-32 flex-col lg:flex-row flex items-center">
      <div className="mr-4">{getIcon(name)}</div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-gray-600">${price}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
