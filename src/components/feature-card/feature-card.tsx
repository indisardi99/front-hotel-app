import React from "react";
import { CalendarIcon, Wifi, Dumbbell, Leaf, Lock, Tv } from "lucide-react";

interface FeatureCardProps {
  id: string;
  title: string;
  icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <CalendarIcon className="m-2 size-4" />,
  wifi: <Wifi className="m-2 size-4" />,
  dumbbell: <Dumbbell className="m-2 size-4" />,
  leaf: <Leaf className="m-2 size-4" />,
  lock: <Lock className="m-2 size-4" />,
  tv: <Tv className="m-2 size-4" />,
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon }) => {
  return (
    <div className="flex size-20 flex-col items-center rounded-md border text-black">
      <h1 className="mt-2 text-xs">{title}</h1>
      <h1>{iconMap[icon]}</h1>
    </div>
  );
};

export default FeatureCard;
