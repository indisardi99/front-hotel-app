import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div className="flex w-full items-center bg-black">
      <div className="flex w-full flex-row justify-between px-32 text-white">
        <Image src="/logo.png" alt="Logo" width={150} height={100} />
        <div className="flex items-end space-x-8 pb-6">
          <Link href="/">Inicio</Link>
          <Link href="/rooms">Habitaciones</Link>
          {/* <Link href="">Perfil</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
