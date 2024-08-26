import RoomCard from "@/components/room-card/room-card";
import { Room, RoomSearch } from "@/lib/interfaces";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/getAllRooms?start=${searchParams?.start}&end=${searchParams?.end}`,
    {
      next: { revalidate: 1 },
    }
  ).then((res) => res.json());

  return (
    <div className="flex flex-col">
      <h1>{searchParams?.start}</h1>
      <h1>{searchParams?.end}</h1>
      <div className="m-2 p-2">
        {response.data.map((room: RoomSearch) => (
          <RoomCard
            key={room.id}
            id={room.id}
            imageUrl={room.images[0]}
            title={room.category}
            price={room.price}
            number={room.number}
            services={room.features.map((feature) => ({
              id: feature.id,
              title: feature.name,
              icon: feature.name.toLowerCase().includes("king")
                ? "leaf"
                : "calendar",
            }))}
          />
        ))}
      </div>
    </div>
  );
}
