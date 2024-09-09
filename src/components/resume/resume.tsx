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
    let guestWithNumbers = {};
    reserve?.guests?.forEach((item, i) => {
      guestWithNumbers = {
        ...guestWithNumbers,
        [`firstName${i + 1}`]: item.firstName,
        [`lastName${i + 1}`]: item.lastName,
      };
    });

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
            ...guestWithNumbers,
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

    if (!user.phone || !user.adress) {
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
    <div className="flex min-w-[310px] h-full max-h-[600px] shadow-lg flex-col rounded-lg bg-[#fffdf9] border border-orange-300 p-4">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Resumen de la estancia
      </h1>{" "}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">
          Precio de habitación por día:{" "}
          <span className="font-semibold text-black">
            ${basePrice.toFixed(2)}
          </span>
        </p>
      </div>{" "}
      {additionalItems.length > 0 && (
        <div className="additional-items">
          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            Servicios adicionales:
          </h3>
          <ul className="pl-4 list-disc text-gray-600">
            {additionalItems.map((item, index) => (
              <li key={index} className="text-sm">
                {item.name}:{" "}
                <span className="font-semibold  text-black">
                  ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reserve && (
        <div className="reserve-details mt-4 space-y-2">
          <h4 className="text-lg font-semibold text-gray-800">Estancia:</h4>
          <p className="text-sm text-gray-600">
            Categoría:{" "}
            <span className="font-semibold text-black">{reserve.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Check-in:{" "}
            <span className="font-semibold text-black">
              {reserve.startDate}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Check-out:{" "}
            <span className="font-semibold text-black">{reserve.endDate}</span>
          </p>
          <p className="text-sm text-gray-600">
            Cantidad de huéspedes:{" "}
            <span className="font-semibold text-black">
              {reserve.guestsNumber}
            </span>
          </p>
          {reserve.services && reserve.services.length > 0 && (
            <div className="services mt-2">
              <h4 className="text-sm font-semibold text-gray-800">
                Servicios extras seleccionados:
              </h4>
              <ul className="pl-4 list-disc text-gray-600">
                {reserve.services.map((service, index) => (
                  <li key={index} className="text-sm">
                    {service.name}:{" "}
                    <span className="font-semibold text-black">
                      ${service.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <h3 className="text-xl p-2 m-2 font-semibold text-gray-800 mt-4">
        Total: <span className="text-black">${totalPrice.toFixed(2)}</span>
      </h3>
      <Button
        onClick={handleContinue}
        disabled={loading}
        className="bg-amber-50 border text-md hover:bg-amber-100 shadow-2xl border-orange-400 relative text-orange-500 font-bold"
      >
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
