"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import VerticalNavbar from "@/components/admin-components/admin-navbar/vertical-navbar";
import NavbarAdmin from "@/components/admin-components/navbarAdmin/navbarA";

// Suponiendo que obtienes el rol del usuario de alguna forma, como un contexto global o estado de autenticación.
import {useAuth} from "@/app/context/auth-context";
import Loader from "@/components/loader-admin/loaderAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado para mostrar el loader

  useEffect(() => {
    if (!user) {
      router.push("/unauthorized"); // Si no hay usuario, redirigimos
    } else if (user.role !== "admin") {
      router.push("/unauthorized"); // Si el usuario no es admin, redirigimos
    } else {
      setLoading(false); // Si todo está bien, dejamos de cargar
    }
  }, [user, router]);

  if (loading) {
    return <Loader />; // Mostramos el loader mientras verificamos el rol
  }

  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 w-full bg-black text-white navbar">
        <NavbarAdmin />
      </div>
      <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-gray-800 text-white vertical-navbar">
        <VerticalNavbar />
      </div>

      <div className="ml-64 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}