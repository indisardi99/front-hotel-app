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

  // La respuesta es un array que contiene los detalles de la habitación y los servicios
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
        <ul>
          {services.map((service: Service) => (
            <li key={service.id}>
              {service.type} - ${service.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
