import { Register } from "@/components/register/register";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-row bg-slate-50 w-full h-screen">
      <div className="flex flex-1 items-center justify-center bg-black">
        <Image src="/propaganda.png" alt="Logo" width={700} height={0} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1>Registrate</h1>
        <div className="w-full bg-[#faf9f5] border border-orange-300 max-w-md">
          <Register />
        </div>
        <h2>Ya estas Registrado? logueate</h2>
      </div>
    </div>
  );
};

export default page;
