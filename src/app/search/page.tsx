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
    start: searchParams?.start,
    end: searchParams?.end,
  });

  const response = await fetch(url, {
    next: { revalidate: 1 },
  }).then((res) => res.json());

  return (
    <div className="flex flex-col w-full lg:ml-28 lg:max-w-[1300px] p-2 m-2 justify-center">
      <div className=" m-2 flex flex-row rounded-lg bg-[#faf9f5] border border-orange-300 p-1">
        <FilterDate />
      </div>
      <div></div>
      <div className="m-2 flex items-center flex-row font-bold rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
        <h1>Habitaciones disponibles en las fechas seccionadas:</h1>{" "}
        {searchParams?.start && (
          <p className="m-2 p-2 rounded-md bg-orange-300 ">
            inicio: {searchParams.start}
          </p>
        )}
        {searchParams?.end && (
          <p className="m-2 p-2 rounded-md bg-orange-300 ">
            fin: {searchParams.end}
          </p>
        )}
      </div>

      <div className="m-2 p-2 ">
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
