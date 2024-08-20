import FilterDate from "@/components/filter-date/filter-date";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="relative bg-[#FFF8F8]">
        <div className="relative bg-black">
          <Image
            className="opacity-50"
            src="/hero.jpg"
            alt="Home"
            width={1550}
            height={300}
          />
          <div className=" absolute bottom-0 left-1/2  -translate-x-1/2 translate-y-1/2 rounded-md bg-gray-950 p-2">
            <FilterDate />
          </div>
        </div>
      </div>
    </main>
  );
}
