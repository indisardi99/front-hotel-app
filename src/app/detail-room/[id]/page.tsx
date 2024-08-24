import ServiceCard from "@/components/service-card/services-card";

interface Feature {
  id: string;
  name: string;
}

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: Feature[];
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
    <div>
      <h1>Habitación Detalles</h1>
      <div>
        <h2>Habitación ID: {params.id}</h2>
        <p>Número: {roomDetails.number}</p>
        <p>Precio: ${roomDetails.price}</p>
        <p>Categoría: {roomDetails.category}</p>
        <h3>Características:</h3>
        <ul>
          {roomDetails.features.map((feature: Feature) => (
            <li key={feature.id}>{feature.name}</li>
          ))}
        </ul>
        <h3>Servicios:</h3>
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
