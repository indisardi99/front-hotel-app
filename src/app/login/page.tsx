import Login from "@/components/login/login";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row bg-slate-50 w-full h-screen">
      <div className="hidden md:flex flex-1 items-center justify-center bg-black">
        <Image
          src="/ECLIPSE.png"
          alt="Logo"
          width={400}
          height={0}
          className="shadow-[0_4px_15px_rgba(255,255,255,0.2)] rounded-lg"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 m-2 text-center">
          Ingresa a Eclipse Royal.
        </h1>
        <Login />
      </div>
    </div>
  );
};

export default page;
