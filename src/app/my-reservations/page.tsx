import Image from "next/image";

const page = () => {
  const reservations = [
    {
      id: 1,
      image: "/loftt.jpg",
      category: "Suite Premium",
      startDate: "2024-09-01",
      endDate: "2024-09-05",
      status: "pending",
      price: 1500,
    },
    {
      id: 2,
      image: "/loftt.jpg",
      category: "Loft Premium",
      startDate: "2024-09-10",
      endDate: "2024-09-15",
      status: "in-progress",
      price: 2000,
    },
    {
      id: 3,
      image: "/loftt.jpg",
      category: "Suite",
      startDate: "2024-09-20",
      endDate: "2024-09-25",
      status: "completed",
      price: 1200,
    },
  ];

  return (
    <div className="text-black lg:p-10 ">
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      <div className="flex flex-col justify-around m-2 ">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex items-center justify-around p-4 border border-gray-300 rounded-lg"
          >
            <Image
              src={"/loftt.jpg"}
              alt={"loft"}
              width={300}
              height={200}
              className="rounded-lg object-cover m-2"
            />

            <h2 className="text-xl font-semibold m-2 ">
              {reservation.category}
            </h2>
            <p className=" ">Fecha de inicio: {reservation.startDate}</p>
            <p>Fecha de fin: {reservation.endDate}</p>
            <p>Reserva: {reservation.status}</p>

            <div className=" flex flex-end justify-end bg-red-500">
              <p>Valor pagado: ${reservation.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
