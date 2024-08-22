import RoomCard from "@/components/room-card/room-card";

const page = () => {
  return (
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
    </div>
  );
};

export default page;
