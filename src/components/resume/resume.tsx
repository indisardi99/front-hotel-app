"use client";

import { SummaryProps } from "@/lib/interfaces";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useCart } from "@/app/context/cart-context";

//* http://localhost:3000/reservation/create-reservation/bf869636-2f87-416b-a969-c715b9c7e91d
const Summary: React.FC<SummaryProps> = ({
  title,
  basePrice,
  additionalItems,
  id,
}) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const totalAdditionalPrice = additionalItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const { reserve } = useCart();

  useEffect(() => {
    if (reserve) {
      console.log("Información de la reserva:", reserve);
    }
  }, [reserve]);

  const totalPrice = basePrice + totalAdditionalPrice;
  useEffect(() => {
    initMercadoPago("TEST-c51dee68-4858-486f-b364-2caa5853ead4", {
      locale: "es-AR",
    });
  }, []);

  const newservices = additionalItems.map((item) => {
    return item.name;
  });

  const createReservation = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/create-reservation/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: id,
            services: newservices,
            startDate: reserve?.startDate,
            endDate: reserve?.endDate,
          }),
        }
      );

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(`Error ${res.status}: ${errorMessage}`);
        throw new Error("Error al crear la reserva");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createPreferenceId = async ({
    id,
    title,
    number,
    unit_price,
  }: {
    id: string;
    title: string;
    number: number;
    unit_price: number;
  }) => {
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
        console.error(`Error ${response.status}: ${errorMessage}`);
        throw new Error("Error al crear la preferencia");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleContinue = async () => {
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
    }
  };

  return (
    <div className="flex flex-col rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <h2>{title}</h2>
      <p>Precio de habitacion: ${basePrice.toFixed(2)}</p>

      {additionalItems.length > 0 && (
        <div className="additional-items">
          <h3>Servicios adicionales:</h3>
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
          <h4>Estadia:</h4>
          <p>{reserve.category}</p>
          <p>check-in: {reserve.startDate}</p>
          <p>Check-out: {reserve.endDate}</p>
          <p>Cantidad de huespedes: {reserve.guestsNumber}</p>
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

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <Button onClick={handleContinue}>Presiona para reservar</Button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default Summary;
