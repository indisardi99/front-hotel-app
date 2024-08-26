"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuIcon, XIcon } from "lucide-react";
import useAuthStore from "@/hooks/store/useAuthStore";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-50 flex flex-row w-full justify-between text-white items-center bg-black p-4">
      <Image
        className="lg:ml-20"
        src="/logo.png"
        alt="Logo"
        width={150}
        height={100}
      />
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? (
            <XIcon className="h-8 w-8" />
          ) : (
            <MenuIcon className="h-8 w-8" />
          )}
        </button>
      </div>
      <div className="hidden pr-20 lg:flex space-x-4">
        <Link href="/">Inicio</Link>
        <Link href="/all-rooms">Habitaciones</Link>
        {isAuthenticated ? (
          <Link href="/profile">Mi Perfil</Link>
        ) : (
          <>
            <Link href="/register">Registrarse</Link>
            <Link href="/login">Ingresar</Link>
          </>
        )}
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-black flex flex-col space-y-4 p-4 z-50">
          <Link href="/" onClick={toggleMenu}>
            Inicio
          </Link>
          <Link href="/rooms" onClick={toggleMenu}>
            Habitaciones
          </Link>
          {isAuthenticated ? (
            <Link href="/profile" onClick={toggleMenu}>
              Mi Perfil
            </Link>
          ) : (
            <>
              <Link href="/register" onClick={toggleMenu}>
                Registrarse
              </Link>
              <Link href="/login" onClick={toggleMenu}>
                Ingresar
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
