"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Acceso Denegado</h1>
      <p className="text-lg mt-4">No tienes permiso para acceder a esta página.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        volver al inicio
      </button>
    </div>
  );
};

export default Unauthorized;