"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/auth-context";
import Image from "next/image";

export function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col  items-center justify-center p-4 bg-gray-50 min-h-screen">
      <div className="w-full border border-orange-400  max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Tu perfil{" "}
        </h1>

        <div className="flex flex-col items-center mb-6">
          <Image
            className="w-24 h-24 rounded-full mb-4 border-2 border-orange-300"
            src={user?.image || "/avatar.png"}
            alt="Avatar del usuario"
            width={0}
            height={0}
          />
          <h2 className="text-2xl font-semibold text-gray-700">{user?.name}</h2>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="text-gray-800">Correo:</strong> {user?.email}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Dirección:</strong>{" "}
            {user?.adress || "No especificada"}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Teléfono:</strong>{" "}
            {user?.phone || "No especificado"}
          </p>
        </div>

        <Button
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
          onClick={() => router.push("/update-information")}
        >
          Editar Información
        </Button>
      </div>
    </div>
  );
}
