"use client";

import { Preference, SummaryProps } from "@/lib/interfaces";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useCart } from "@/app/context/cart-context";
import { useAuth } from "@/app/context/auth-context";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/navigation";

const Summary: React.FC<SummaryProps> = ({
  title,
  basePrice,
  additionalItems,
  id,
}) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { reserve, updateReserve } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalAdditionalPrice = additionalItems.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const days = reserve
    ? calculateDays(reserve.startDate!, reserve.endDate!)
    : 1;
  const totalPrice = (basePrice + totalAdditionalPrice) * days;

  useEffect(() => {
    initMercadoPago("APP_USR-35538bb9-61e1-4eac-b576-39d00aabb950", {
      locale: "es-AR",
    });
  }, []);

  const newservices = additionalItems.map((item) => {
    return item.name;
  });

  const createReservation = async () => {
    console.log("reservando: ", user, reserve);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/create-reservation/${user?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: reserve?.roomId,
            services: newservices,
            startDate: reserve?.startDate,
            endDate: reserve?.endDate,
          }),
        }
      );

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error("Error al crear la reserva");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createPreferenceId = async ({
    id,
    title,
    number,
    unit_price,
  }: Preference) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mercado-pago`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                id,
                title,
                number,
                unit_price,
                quantity: 1,
              },
            ],
          }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Error al crear la preferencia");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleContinue = async () => {
    if (!user) {
      toast.error("Por favor inicia sesión para reservar");
      router.push("/login");
      return;
    }

    if (!user.phone || !user.address) {
      toast.error("Por favor completa tu perfil");
      router.push("/update-information");
      return;
    }

    if (!reserve?.startDate || !reserve?.endDate) {
      const { value: dates } = await Swal.fire({
        title: "Selecciona las fechas",
        html:
          '<input id="startDate" type="date" class="swal2-input">' +
          '<input id="endDate" type="date" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return {
            startDate: (
              document.getElementById("startDate") as HTMLInputElement
            ).value,
            endDate: (document.getElementById("endDate") as HTMLInputElement)
              .value,
          };
        },
      });

      if (dates && dates.startDate && dates.endDate) {
        updateReserve({ startDate: dates.startDate, endDate: dates.endDate });
      } else {
        toast.error("Por favor selecciona fechas válidas");
        return;
      }
    }

    setLoading(true);

    try {
      const res = await createReservation();
      if (res.id) {
        const { category, number } = res.room;
        const { price, id } = res;
        const response = await createPreferenceId({
          title: category,
          number,
          unit_price: price,
          id,
        });
        setPreferenceId(response.preferenceId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-w-[310px] h-full shadow-lg flex-col rounded-lg bg-[#fffdf9] border border-orange-300 p-4">
      <h1 className="text-2xl mb-4 font-bold">Resumen de la estadia</h1>
      <h2 className="font-semibold">{title}</h2>
      <p>Precio de habitación: ${basePrice.toFixed(2)} por dia.</p>
      {additionalItems.length > 0 && (
        <div className="additional-items">
          <h3 className="font-semibold mt-4">Servicios adicionales:</h3>
          <ul>
            {additionalItems.map((item, index) => (
              <li key={index}>
                {item.name}: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {reserve && (
        <div className="mt-4">
          <h4 className="font-semibold">Estadia:</h4>
          <p>{reserve.category}</p>
          <p>Check-in: {reserve.startDate}</p>
          <p>Check-out: {reserve.endDate}</p>
          <p>Cantidad de huéspedes: {reserve.guestsNumber}</p>
          {reserve.services && reserve.services.length > 0 && (
            <div>
              <h4>Servicios extras seleccionados:</h4>
              <ul>
                {reserve.services.map((service, index) => (
                  <li key={index}>
                    {service.name}: ${service.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <h3 className="font-semibold mt-4 ">Total: ${totalPrice.toFixed(2)} </h3>
      <Button onClick={handleContinue} disabled={loading} className="relative">
        {loading && <Spinner />}
        {!loading && "Presiona para reservar"}
      </Button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default Summary;
