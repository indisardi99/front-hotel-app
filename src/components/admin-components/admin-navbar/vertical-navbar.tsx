"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VerticalNavbar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        <Link
          href="/admin"
          className={`p-2 rounded ${
            isActive("/admin") ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
          }`}
        >
          Administrador
        </Link>
      </div>
      <div className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              href="/admin/habitaciones"
              className={`p-2 rounded ${
                isActive("/admin/habitaciones")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Habitaciones
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className={`p-2 rounded ${
                isActive("/admin/users")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Usuarios
            </Link>
          </li>
          <li>
            <Link
              href="/admin/caracteristicas"
              className={`p-2 rounded ${
                isActive("/admin/caracteristicas")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Características
            </Link>
          </li>
          <li>
            <Link
              href="/admin/servicios"
              className={`p-2 rounded ${
                isActive("/admin/servicios")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              href="/admin/ganancias"
              className={`p-2 rounded ${
                isActive("/admin/ganancias")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Ganancias
            </Link>
          </li>
          <li>
            <Link
              href="/reservations"
              className={`p-2 rounded ${
                isActive("/admin/ganancias")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Reservas
            </Link>
          </li>
          <li>
            <Link
              href="/admin/create-employee"
              className={`p-2 rounded ${
                isActive("/admin/create-employee")
                  ? "bg-gray-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Crear empleado
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerticalNavbar;
