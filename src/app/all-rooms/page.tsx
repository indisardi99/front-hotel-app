import FilterDate from "@/components/filter-date/filter-date";

const page = async () => {
  const page = 1;
  const limit = 10;
  try {
    const res = await fetch(
      `http://:3000/room/getAllRooms?page=${page}&limit=${limit}`,
      { next: { revalidate: 1 } }
    );

    if (!res.ok) {
      throw new Error("Error al obtener las habitaciones");
    }

    const data = await res.json();

    return (
      <div className="w-full flex flex-col mt-5 lg:mt-2 p-1 ">
        <div className=" border border-orange-300  rounded-md bg-[#faf9f5] ">
          <FilterDate />
        </div>
        <h1>Habitaciones</h1>
      </div>
    );
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return <p>Hubo un problema al cargar las habitaciones.</p>;
  }
};

export default page;
