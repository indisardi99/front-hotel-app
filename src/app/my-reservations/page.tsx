"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/auth-context"; // Asegúrate de que la ruta es correcta
import { useRouter } from "next/navigation";

interface Room {
  id: string;
  number: number;
  price: number;
  category: string;
  images: string[];
}

interface Reservation {
  id: string;
  price: number;
  startDate: string;
  status: string;
  endDate: string;
  room: Room;
  guestName1?: string | null;
  guestLastName1?: string | null;
  guestName2?: string | null;
  guestLastName2?: string | null;
  guestName3?: string | null;
  guestLastName3?: string | null;
  guestName4?: string | null;
  guestLastName4?: string | null;
}

const MyReservations = () => {
  const { user, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/getUserReservations/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setReservations(data.data))
        .catch((error) => console.error("Error fetching reservations:", error));
    }
  }, [user, isAuthenticated, router]);

  return (
    <div className="text-black lg:p-10">
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      <div className="flex flex-col justify-between m-2">
        {reservations.length === 0 ? (
          <p className="text-center text-gray-500">No tienes reservas.</p>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex items-center p-4 border justify-between bg-[#faf9f5] border-orange-300 rounded-lg"
            >
              <div className="flex flex-row">
                <Image
                  src={reservation.room?.images[0] || "/default-room.jpg"}
                  alt={reservation.room?.category || "Reserva"}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover m-2"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold m-2 ">
                    {reservation.room?.category}
                  </h2>
                  <p>Fecha de inicio: {reservation.startDate}</p>
                  <p>Fecha de fin: {reservation.endDate}</p>
                  <p>Estado de la reserva: {reservation.status}</p>
                  <p>Habitación: {reservation.room?.number}</p>
                </div>
              </div>
              <div className="m-2 p-2 flex flex-end justify-end rounded-lg bg-[#faf9f5] border border-orange-300">
                <p>${reservation.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReservations;
