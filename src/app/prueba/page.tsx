"use client";
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const YourComponent = () => {
  useEffect(() => {
    initMercadoPago("TEST-c51dee68-4858-486f-b364-2caa5853ead4", {
      locale: "es-AR",
    });
  }, []);

  const [preferenceId, setPrefereceId] = useState();

  const createPreferenceId = async () => {
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
                id: "6f7aa00b-3bc7-401f-8ff4-a40599cc3882",
                title: "Suite Deluxe",
                number: 305,
                unit_price: 150.0,
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
      // Manejo de errores aquí, según sea necesario
    }
  };

  const handleClick = async () => {
    const res = await createPreferenceId();
    setPrefereceId(res.preferenceId);
  };

  return (
    <div>
      <button onClick={handleClick}>Prueba </button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default YourComponent;
