'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuIcon, XIcon } from 'lucide-react'
import { useAuth } from '@/app/context/auth-context'
import { usePathname } from 'next/navigation'
import ComboboxDemo from '../ui/bombobox-demo'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const pathname = usePathname()

  if (pathname.startsWith('/admin') || pathname.startsWith('/activate')) {
    return null
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const renderLinks = () => (
    <>
      <Link href="/" onClick={isOpen ? toggleMenu : undefined}>
        Inicio
      </Link>
      <Link href="/all-rooms" onClick={isOpen ? toggleMenu : undefined}>
        Habitaciones
      </Link>

      {isAuthenticated &&
        (user?.role === "admin" || user?.role === "employee") && (
          <Link href="/admin" onClick={isOpen ? toggleMenu : undefined}>
            Admin Panel
          </Link>
        )}

      {isAuthenticated ? (
        <ComboboxDemo />
      ) : (
        <Link
          href="/login"
          className="border border-orange-300 p-2 m-2 rounded-md"
          onClick={isOpen ? toggleMenu : undefined}
        >
          Ingresar
        </Link>
      )}
    </>
  );

  return (
    <div className="relative z-50 flex flex-row w-full justify-between text-white items-center bg-black p-4">
      <Link href="/">
        <Image
          className="lg:ml-20"
          src="/logo.png"
          alt="Logo"
          width={150}
          height={100}
        />
      </Link>

      {/* Menu Hamburguesa para móviles */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? (
            <XIcon className="h-8 w-8" />
          ) : (
            <MenuIcon className="h-8 w-8" />
          )}
        </button>
      </div>


      {/* Links para escritorio */}
      <div className="hidden pr-20 items-center lg:flex space-x-4">
        {renderLinks()}
      </div>

      {/* Links para menú hamburguesa en móvil */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-black flex flex-col space-y-4 p-4 z-50">
          {renderLinks()}
        </div>
      )}
    </div>
  )
}

export default Navbar
