'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' //* Importa el hook para obtener la ruta actual

const Footer: React.FC = () => {
  const pathname = usePathname() // Obtiene la ruta actual

  // Si la ruta empieza con /admin, no renderizamos el Footer
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="flex flex-col w-full bg-black py-4 text-white">
      <div className="flex text-center flex-col justify-center lg:flex-row lg:justify-around ">
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
          <Link className="cursor-pointer underline" href="/conditions">
            Términos y Condiciones
          </Link>
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
  )
}

export default Footer
