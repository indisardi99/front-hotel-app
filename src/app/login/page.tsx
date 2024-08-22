import { Login } from "@/components/login/login";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-row bg-slate-50 w-full h-full">
      <div className="flex flex-1 items-center justify-center bg-black">
        <Image src="/propaganda.png" alt="Logo" width={700} height={0} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1>Logueate</h1>
        <div className="w-full bg-[#faf9f5] border border-orange-300 max-w-md">
          <Login />
        </div>
        <h1>Aun no estas Registrado?</h1>
      </div>
    </div>
  );
};

export default page;
