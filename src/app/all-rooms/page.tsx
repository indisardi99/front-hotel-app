"use client";
import React, { useState, useEffect } from "react";
import FilterDate from "@/components/filter-date/filter-date";
import AllRoomCard from "@/components/all-room-card/all-room-card";
import PaginationComponent from "@/components/pagination/pagination";
import ScrollButton from "@/components/scroll-bottom/scroll-buttom";

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  images: string[];
  features: { id: string; name: string }[];
  reservations: {
    id: string;
    price: number;
    startDate: string;
    status: string;
    endDate: string;
    guestName1?: string;
    guestLastName1?: string;
    guestName2?: string;
    guestLastName2?: string;
    guestName3?: string;
    guestLastName3?: string;
    guestName4?: string;
    guestLastName4?: string;
  }[];
}

const Page = () => {
  const [data, setData] = useState<Room[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchRooms = async (page: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/room/getAllRooms?page=${page}&limit=${limit}`,
        { next: { revalidate: 1 } }
      );

      if (!res.ok) {
        throw new Error("Error al obtener las habitaciones");
      }

      const { data, totalPages }: { data: Room[]; totalPages: number } =
        await res.json();
      setData(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="w-full items-center justify-center flex flex-col mt-5 lg:mt-2 p-1">
      <div className="flex flex-row justify-between border border-orange-300 m-2 rounded-md bg-[#faf9f5] p-2">
        <FilterDate />
      </div>
      <div className="m-2 p-2">
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className=" items-center justify-center gap-4">
        {data.length > 0 ? (
          data.map((room) => <AllRoomCard key={room.id} room={room} />)
        ) : (
          <p>No se encontraron habitaciones.</p>
        )}
      </div>
      <ScrollButton />
    </div>
  );
};

export default Page;
