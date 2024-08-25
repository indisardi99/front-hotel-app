import FilterDate from "@/components/filter-date/filter-date";
import RoomCard from "@/components/room-card/room-card";
import { Room } from "@/lib/interfaces";

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
    console.log(data);
    const rooms: Room[] = data.data ? data.data : [];

    return (
      <div className="w-full flex flex-col mt-5 lg:mt-20 p-1 lg:px-32">
        <div className="m-6 border border-orange-300  rounded-md bg-[#faf9f5] p-2">
          <FilterDate />
        </div>
        <div>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                number={room.number}
                imageUrl="/room.jpg"
                title={room.category}
                price={room.price}
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
      </div>
    );
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return <p>Hubo un problema al cargar las habitaciones.</p>;
  }
};

export default page;
