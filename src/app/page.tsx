import FilterDate from "@/components/filter-date/filter-date";
import RoomCard from "@/components/room-card/room-card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full items-center justify-center bg-slate-50">
      <div className="relative justify-center w-full">
        <div className="relative bg-black">
          {/* Imagen para pantallas grandes */}
          <div className="hidden lg:block">
            <Image
              className="opacity-50"
              src="/hero.jpg"
              alt="Home"
              width={1550}
              height={0}
            />
          </div>

          {/* Imagen para pantallas pequeñas */}
          <div className="block lg:hidden">
            <Image
              className="opacity-50"
              src="/mobile.jpg"
              alt="Home"
              width={750}
              height={0}
            />
          </div>

          <div className="hidden lg:flex border border-orange-300 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-md bg-[#faf9f5] p-2">
            <FilterDate />
          </div>
        </div>

        <div className="flex flex-col items-center p-2 justify-center bg-[#faf9f5] border border-orange-300 max-w-[320px] lg:hidden mt-4">
          <FilterDate />
        </div>

        <div className="w-full flex flex-col mt-5 lg:mt-20 p-1 lg:px-32">
          <RoomCard
            imageUrl="/room.jpg"
            title="Suite de Lujo"
            price="$200 por noche"
            description="Una suite amplia con vistas al mar y todas las comodidades para una estancia de lujo."
            services={[
              { id: "1", title: "WiFi gratuito", icon: "wifi" },
              { id: "2", title: "Gimnasio", icon: "dumbbell" },
              { id: "3", title: "Vista al mar", icon: "calendar" },
              { id: "4", title: "Cama King Size", icon: "leaf" },
            ]}
          />
          <RoomCard
            imageUrl="/room.jpg"
            title="Suite de Lujo"
            price="$200 por noche"
            description="Una suite amplia con vistas al mar y todas las comodidades para una estancia de lujo."
            services={[
              { id: "1", title: "WiFi gratuito", icon: "wifi" },
              { id: "2", title: "Gimnasio", icon: "dumbbell" },
              { id: "3", title: "Vista al mar", icon: "calendar" },
              { id: "4", title: "Cama King Size", icon: "leaf" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
