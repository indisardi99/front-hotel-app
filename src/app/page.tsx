import FilterDate from "@/components/filter-date/filter-date";
import RoomCard from "@/components/room-card/room-card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-slate-50">
      <div className="relative">
        <div className="relative bg-black">
          <Image
            className="opacity-50"
            src="/hero.jpg"
            alt="Home"
            width={1550}
            height={300}
          />
          <div className=" border border-orange-300 absolute bottom-0 left-1/2  -translate-x-1/2 translate-y-1/2 rounded-md bg-[#faf9f5] p-2">
            <FilterDate />
          </div>
        </div>
        <div className=" mt-20 px-32">
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