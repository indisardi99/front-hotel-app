import React from "react";

interface ServiceCardProps {
  type: string;
  price: number;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ type, price, icon }) => {
  return (
    <div className="border p-4 rounded shadow-md mb-4 flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h4 className="font-semibold">{type}</h4>
        <p className="text-gray-600">${price}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
// [
//     {
//       "id": "4f7805b1-f664-46f1-9542-85dd7c61f476",
//       "price": 50,
//       "type": "breakfast"
//     },
//     {
//       "id": "c4290629-9e7d-4f25-b968-a462cf81ae06",
//       "price": 100,
//       "type": "hotelbar"
//     },
//     {
//       "id": "23495bdf-51ff-427b-b8df-5c43c6cb55bb",
//       "price": 200,
//       "type": "spa"
//     }
//   ]
// ]
