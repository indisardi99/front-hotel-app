import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Service {
  id: string;
  price: number;
  type: string;
}

const RoomDetail = () => {
  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && typeof id === "string") {
      // Verificar que el `id` tiene el formato de un UUID
      const isValidUUID = (uuid: string) => {
        const uuidRegex =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(uuid);
      };

      if (isValidUUID(id)) {
        const fetchRoomData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/room/getRoomById/${id}`
            );
            if (!response.ok) {
              throw new Error("Error fetching room data");
            }
            const [, servicesData] = await response.json();
            setServices(servicesData);
          } catch (error) {
            console.error("Error fetching room data:", error);
          }
        };

        fetchRoomData();
      } else {
        console.error("Invalid UUID format");
      }
    }
  }, [id]);

  if (services.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Servicios Disponibles</h1>
      <div>
        <h2>Servicios:</h2>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.type} - ${service.price}
            </li>
          ))}
        </ul>
      </div>
      {/* Aquí podrías agregar más detalles según la estructura de tu respuesta */}
    </div>
  );
};

export default RoomDetail;
