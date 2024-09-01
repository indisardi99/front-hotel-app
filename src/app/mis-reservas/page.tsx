import Image from "next/image";

const page = () => {
  // Datos de ejemplo hardcodeados
  const reservations = [
    {
      id: 1,
      image: "/loft.jpg",
      category: "Suite Premium",
      startDate: "2024-09-01",
      endDate: "2024-09-05",
      status: "pending",
      price: 1500,
    },
    {
      id: 2,
      image: "/loft.jpg",
      category: "Loft Premium",
      startDate: "2024-09-10",
      endDate: "2024-09-15",
      status: "in-progress",
      price: 2000,
    },
    {
      id: 3,
      image: "/loft.jpg",
      category: "Suite",
      startDate: "2024-09-20",
      endDate: "2024-09-25",
      status: "completed",
      price: 1200,
    },
  ];

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex items-center p-4 border border-gray-300 rounded-lg"
          >
            <Image
              src={"/loft.jpg"}
              alt={"loft"}
              width={200}
              height={0}
              className="rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{reservation.category}</h2>
              <p>Fecha de inicio: {reservation.startDate}</p>
              <p>Fecha de fin: {reservation.endDate}</p>
              <p>Estado: {reservation.status}</p>
              <p>Valor pagado: ${reservation.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
