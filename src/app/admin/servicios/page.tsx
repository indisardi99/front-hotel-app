"use client";
import { useEffect, useState } from "react";
import ServiceCardAdmin from "@/components/admin-components/all-services-admin/service-card-admin";
import Swal from "sweetalert2";
import Link from "next/link";
import "sweetalert2/src/sweetalert2.scss";

interface Service {
  id: string;
  name: string;
  price: number;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/getAllServices`
      );

      if (!res.ok) {
        throw new Error("Error al obtener los servicios");
      }

      const services: Service[] = await res.json();
      setServices(services);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los servicios.",
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleUpdateService = async (
    id: string,
    updatedData: Partial<Service>
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/updateService/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        throw new Error("Error al actualizar el servicio");
      }

      Swal.fire({
        icon: "success",
        title: "Servicio actualizado",
        text: "El servicio ha sido actualizado con éxito.",
      });
      fetchServices(); // Actualizar la lista después de la acción
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el servicio.",
      });
    }
  };

  return (
    <div className="p-7 pt-20 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gestión de Servicios</h1>
      <p className="mb-4">Aquí puedes ver y gestionar los servicios.</p>
      <Link href="/admin/create-service">
        <button className="bg-green-500 text-white px-4 py-2 mb-4 rounded hover:bg-green-600">
          Crear nuevo servicio
        </button>
      </Link>
      <div className="flex flex-col gap-5">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCardAdmin
              key={service.id}
              {...service}
              onUpdate={handleUpdateService}
            />
          ))
        ) : (
          <p>No hay servicios disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
