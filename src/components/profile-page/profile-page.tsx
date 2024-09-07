"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/auth-context";

export function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
      <div className="w-full max-w-md">
        <p>
          <strong>Nombre:</strong> {user?.name}
        </p>
        <p>
          <strong>Correo:</strong> {user?.email}
        </p>
        <p>
          <strong>Dirección:</strong> {user?.adress}
        </p>
        <p>
          <strong>Teléfono:</strong> {user?.phone}
        </p>

        <Button
          className="mt-6 w-full hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black"
          onClick={() => router.push("/update-information")}
        >
          Editar Información
        </Button>
      </div>
    </div>
  );
}
