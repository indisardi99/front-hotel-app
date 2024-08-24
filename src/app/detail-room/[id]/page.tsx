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
    `http://localhost:3000/room/getRoomById/${params.id}`
  ).then((res) => res.json());
  console.log(response);

  return (
    <div>
      <h1>Servicios Disponibles</h1>
      <div>
        <h2>Servicios: {params.id}</h2>
        <ul>
          {/*    {services.map((service) => (
            <li key={service.id}>
              {service.type} - ${service.price}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
