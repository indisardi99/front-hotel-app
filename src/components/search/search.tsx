"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/room-card/room-card";

const SearchComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const startDay = searchParams.get("startDay");
  const endDay = searchParams.get("endDay");

  useEffect(() => {
    if (startDay && endDay) {
      const fetchRooms = async () => {
        try {
          const res = await fetch("http://localhost:3000/room/getAllRooms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDay,
              endDay,
            }),
          });

          if (!res.ok) throw new Error("Error en la respuesta del servidor.");
          const data = await res.json();
          setRooms(data);
        } catch (error) {
          setError("No se pudieron obtener las habitaciones.");
        } finally {
          setLoading(false);
        }
      };

      fetchRooms();
    }
  }, [startDay, endDay]);

  const formattedStartDay = startDay
    ? format(new Date(startDay), "LLL dd, yyyy")
    : "N/A";
  const formattedEndDay = endDay
    ? format(new Date(endDay), "LLL dd, yyyy")
    : "N/A";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Disponibilidad de Habitaciones
      </h1>
      <div className="mb-4">
        <p>
          <strong>Fechas seleccionadas:</strong> {formattedStartDay} -{" "}
          {formattedEndDay}
        </p>
      </div>
      {loading && <p>Cargando habitaciones...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              imageUrl={room.imageUrl}
              title={room.title}
              price={room.price}
              description={room.description}
              services={room.services}
            />
          ))
        ) : (
          <p>No hay habitaciones disponibles para las fechas seleccionadas.</p>
        )}
      </div>
      <Button className="mt-4" onClick={() => window.history.back()}>
        Volver
      </Button>
    </div>
  );
};

export default SearchComponent;
