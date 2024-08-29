import React from "react";

interface ServiceCardProps {
  type: string;
  price: number;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, price, icon }) => {
  return (
    <div className="min-w-32 flex-col lg:flex-row flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h4 className="font-semibold">{type}</h4>
        <p className="text-gray-600">${price}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
