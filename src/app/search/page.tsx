import FilterDate from "@/components/filter-date/filter-date";
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
  start?: string;
  end?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const buildUrl = (baseUrl: string, params: SearchParams) => {
    const query = (Object.keys(params) as (keyof SearchParams)[])
      .filter(
        (key) =>
          params[key] !== undefined && params[key] !== null && params[key]
      )
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
    start: searchParams?.start,
    end: searchParams?.end,
  });

  const response = await fetch(url, {
    next: { revalidate: 1 },
  }).then((res) => res.json());

  return (
    <div className="">
      <div className="">
        <FilterDate />
      </div>
      <div></div>

      <div className="">
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
              icon: "",
            }))}
          />
        ))}
      </div>
    </div>
  );
}
