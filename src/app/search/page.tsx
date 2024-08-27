import RoomCard from "@/components/room-card/room-card";
import { Room, RoomSearch } from "@/lib/interfaces";

interface SearchParams {
  page?: number;
  limit?: number;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  startingDate?: string;
  endingDate?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const buildUrl = (baseUrl: string, params: SearchParams) => {
    const query = (Object.keys(params) as (keyof SearchParams)[])
      .filter((key) => params[key] !== undefined && params[key] !== null)
      .map((key) => `${key}=${encodeURIComponent(params[key] as string)}`)
      .join("&");
    return `${baseUrl}?${query}`;
  };

  const url = buildUrl(`${process.env.NEXT_PUBLIC_API_URL}/room/getAllRooms`, {
    page: searchParams?.page,
    limit: searchParams?.limit,
    category: searchParams?.category,
    maxPrice: searchParams?.maxPrice,
    minPrice: searchParams?.minPrice,
    startingDate: searchParams?.startingDate,
    endingDate: searchParams?.endingDate,
  });

  const response = await fetch(url, {
    next: { revalidate: 1 },
  }).then((res) => res.json());

  return (
    <div className="flex flex-col">
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
