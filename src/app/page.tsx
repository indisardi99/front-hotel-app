import FilterDate from "@/components/filter-date/filter-date";
import Image from "next/image";
import Inicio from "./inicio/page";
import ScrollButton from "@/components/scroll-bottom/scroll-buttom";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full items-center justify-center bg-slate-50">
      <div className="relative justify-center w-full">
        <div className="relative bg-black">
          <div className="hidden lg:block">
            <Image
              className="opacity-50"
              src="/hero.png"
              alt="Home"
              width={1550}
              height={0}
            />
          </div>
          <div className="block lg:hidden">
            <Image
              className="opacity-50"
              src="/mobile.jpg"
              alt="Home"
              width={750}
              height={0}
            />
          </div>

          <div className="hidden justify-between  lg:flex border border-orange-300 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-md bg-[#faf9f5] p-2">
            <FilterDate />
          </div>
        </div>

        <div className="flex flex-col items-center p-2 justify-center bg-[#faf9f5] border border-orange-300 max-w-[320px] lg:hidden mt-4">
          <FilterDate />
        </div>
        <div>
          <Inicio />
        </div>
      </div>
      <ScrollButton />
    </main>
  );
}
