import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black py-4 text-white">
      <div className="flex flex-row justify-around px-32">
        <div className="flex flex-col ">
          <h3 className="pb-1 text-lg">Eclipse Royal</h3>
          <p className="text-sm">Dirección: Calle Falsa 123, Ciudad</p>
          <p className="text-sm">Teléfono: +55 11 9999-9999</p>
          <p className="text-sm">Email: eclipse@royal.com</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Link className="cursor-pointer underline" href="/about-us">
            Sobre Nosotros
          </Link>

          <h3 className="cursor-pointer underline">Contáctanos</h3>
          <h3 className="cursor-pointer underline">Términos y Condiciones</h3>
        </div>
        <div className="flex flex-col space-y-2">
          <h3 className="cursor-pointer underline">Twitter</h3>
          <h3 className="cursor-pointer underline">Instagram</h3>
          <h3 className="cursor-pointer underline">Facebook</h3>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        &copy; 2024 Eclipse Royal. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
