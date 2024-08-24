import React from "react";

interface ServiceCardProps {
  type: string;
  price: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, price }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <h4 className="font-semibold">{type}</h4>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default ServiceCard;
