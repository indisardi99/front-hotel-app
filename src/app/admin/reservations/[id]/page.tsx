import ReserveCard from "../reserveCard";

const uniqueParam = Date.now();

async function getReserves2() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservation/getAllReservations?page=1&limit=100&unique=${uniqueParam}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
  const data = await res.json();
  return data;
}

async function ReservesById({ params }: any) {
  const reserves = await getReserves2();
  const reserves2 = reserves.data;
  const reserva_id = reserves2.find(
    (reserva: { id: string }) => reserva.id === params.id
  );

  return (
    <div className="w-full flex flex-col mt-5 lg:mt-20 p-1 lg:px-32">
      <ReserveCard reserve={reserva_id} key={reserva_id.id} />
    </div>
  );
}

export default ReservesById;
