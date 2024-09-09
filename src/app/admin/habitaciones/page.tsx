"use client";
import { useEffect, useState } from "react";
import RoomCardAdmin from "@/components/admin-components/all-rooms-admin/all-rooms-admin";
import Link from "next/link";

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  images: string[];
  features: { id: string; name: string }[];
}

const HabitacionesPage: React.FC = () => {
  const [data, setData] = useState<Room[]>([]);

  const fetchRooms = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/room/getAllRooms?page=1&limit=80`
      );

      if (!res.ok) {
        throw new Error("Error al obtener las habitaciones");
      }

      const { data }: { data: Room[] } = await res.json();
      const sortedRooms = data.sort((a, b) => a.number - b.number);
      setData(sortedRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-7 pt-20 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gestión de Habitaciones</h1>
      <p className="mb-4">Aquí puedes ver y editar las habitaciones.</p>
      <Link
        href="/admin/createRoom"
        className="text-black underline mb-2 block text-sm"
      >
        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          crear habitación
        </button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((room) => (
            <RoomCardAdmin
              key={room.id}
              id={room.id}
              number={room.number}
              price={room.price}
              category={room.category}
            />
          ))
        ) : (
          <p>No se encontraron habitaciones.</p>
        )}
      </div>
    </div>
  );
};

export default HabitacionesPage;
