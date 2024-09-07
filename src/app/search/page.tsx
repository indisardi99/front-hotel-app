import FilterDate from "@/components/filter-date/filter-date";
import FiltersSummary from "@/components/filter-sumary/filter-summary";
import RoomCard from "@/components/room-card/room-card";
import Search from "@/components/search/search";
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
          params[key] !== undefined &&
          params[key] !== null &&
          params[key] &&
          params[key] !== ""
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
    cache: "no-store",
  }).then((res) => res.json());
  return (
    <div className="flex flex-col lg:w-[1300px] ml-28 mt-4 justify-center ">
      <div className="flex flex-row w-full justify-center  lg:flex-row lg:flex border border-orange-300 rounded-md bg-[#faf9f5] p-2">
        <FilterDate />
        {searchParams && <Search searchParams={searchParams} />}
      </div>
      <div>
        <FiltersSummary
          filters={{
            category: searchParams?.category,
            maxPrice: searchParams?.maxPrice,
            minPrice: searchParams?.minPrice,
            startDate: searchParams?.startingDate,
            endDate: searchParams?.endingDate,
          }}
        />
      </div>

      <div className="flex flex-col w-full">
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
