import RoomCard from "@/components/room-card/room-card";

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  features: { name: string }[];
}

const page = async () => {
  const page = 1;
  const limit = 10;
  try {
    const res = await fetch(
      `http://localhost:3000/room/getAllRooms?page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error("Error al obtener las habitaciones");
    }

    const data = await res.json();
    const rooms: Room[] = data.data ? data.data : [];

    return (
      <div className="w-full flex flex-col mt-5 lg:mt-20 p-1 lg:px-32">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              imageUrl="/room.jpg"
              title={room.category}
              price={`$${room.price} por noche`}
              description={`Habitación número ${room.number} con las siguientes características:`}
              services={room.features.map((feature, index) => ({
                id: `${room.number}-${index}`,
                title: feature.name,
                icon: "wifi",
              }))}
            />
          ))
        ) : (
          <p>No hay habitaciones disponibles</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return <p>Hubo un problema al cargar las habitaciones.</p>;
  }
};

export default page;
