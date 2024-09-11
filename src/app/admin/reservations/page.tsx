import Link from "next/link";
import "./styles.css";
import CancelCheckbox from "./CancelCheckbox";

const uniqueParam = Date.now();

async function getReserves() {
  const page = 1;
  const res = await fetch(
    `https://pf-eclipseroyale-qd2v.onrender.com/reservation/getAllReservations?page=${page}&limit=100&unique=${uniqueParam}`,
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

async function Reserves() {
  const reserves1 = await getReserves();
  const reserves = reserves1.data;
  console.log("longitud array reservas", reserves.length);
  const cont = reserves.length;

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-36 ">
        <Link href="/admin/reservations">
          <h1 className="text-3xl font-bold text-black m-2 text-center">
            Todas las Reservas
          </h1>
        </Link>
        <div className="flex flex-row w-full justify-around ">
          <div className="filter-container flex flex-row w-full justify-around">
            <div
              className="dropdown4"
              style={{
                paddingLeft: "10px",
                paddingTop: "20px",
                paddingRight: "20px",
              }}
            >
              <button
                className="border border-blue-950 m-2 p-2 rounded-md"
                style={{ fontSize: "20px" }}
              >
                Filtro por Estado
              </button>
              <div className="dropdown-content4">
                <Link href="/admin/reservations/pending/">
                  <p className="rounded-md border border-yellow-500 bg-yellow-400 ">
                    {" "}
                    Pendiente
                  </p>
                </Link>
                <Link href="/admin/reservations/cancelled/">
                  <p className="rounded-md border border-red-600 bg-red-400 ">
                    {" "}
                    Cancelada
                  </p>
                </Link>
                <Link href="/admin/reservations/paid/">
                  <p className="rounded-md border border-blue-600 bg-blue-400  ">
                    {" "}
                    Pagada
                  </p>
                </Link>
                <Link href="/admin/reservations/completed/">
                  <p className="rounded-md border border-green-600 bg-green-400  ">
                    {" "}
                    Completada
                  </p>
                </Link>
                <Link href="/admin/reservations/inprogress/">
                  <p className="rounded-md border border-gray-600 bg-gray-400  ">
                    {" "}
                    En progreso
                  </p>
                </Link>
              </div>
            </div>
            <div
              className="dropdown2"
              style={{
                paddingLeft: "10px",
                paddingTop: "20px",
                paddingRight: "20px",
              }}
            >
              <button
                className="border border-blue-950 m-2 p-2 rounded-md"
                style={{ fontSize: "20px" }}
              >
                Filtro por Categoría
              </button>
              <div className="dropdown-content2">
                <Link href="/admin/reservations/suite/">
                  <p className="rounded-md border border-blue-500 ">Suite</p>
                </Link>
                <Link href="/admin/reservations/suite_premium/">
                  <p className="rounded-md border border-blue-500 ">
                    Suite Premium
                  </p>
                </Link>
                <Link href="/admin/reservations/loft/">
                  <p className="rounded-md border border-blue-500 "> Loft</p>
                </Link>
                <Link href="/admin/reservations/loft_premium/">
                  <p className="rounded-md border border-blue-500 ">
                    Loft Premium
                  </p>
                </Link>
              </div>
            </div>
            <div
              className="dropdown3"
              style={{
                paddingLeft: "10px",
                paddingTop: "20px",
                paddingRight: "20px",
              }}
            >
              <button
                className="border border-blue-950 m-2 p-2 rounded-md"
                style={{ fontSize: "20px" }}
              >
                Filtro por Precio
              </button>
              <div className="dropdown-content3">
                <Link href="/admin/reservations/menos300/">
                  <p className="rounded-md border border-green-500 ">
                    {" "}
                    Menos de $300
                  </p>
                </Link>
                <Link href="/admin/reservations/betwenn3001000/">
                  <p className="rounded-md border border-green-500 ">
                    {" "}
                    de $300 a $1000
                  </p>
                </Link>
                <Link href="/admin/reservations/more1000/">
                  <p className="rounded-md border border-green-500 ">
                    {" "}
                    Más de $1000
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Email</th>
            <th>Estado</th>
            <th>Categoría</th>
            <th>Habitación</th>
            <th>Precio</th>
            <th>Fecha Inicio</th>
            <th>Fecha Finalización</th>
            <th>Ver detalle</th>
            <th className="cancel-column">Cancelar</th>
          </tr>
        </thead>
        <tbody>
          {reserves.map((reserve: any, index: any) => (
            <tr key={reserve.id}>
              <td>{index + 1}</td>
              <td>{reserve.user.email}</td>
              <td
                className={`
            ${reserve.status === "pending" && "text-yellow-500"} 
            ${reserve.status === "canceled" && "text-red-500"}
            ${reserve.status === "paid" && "text-blue-500"}
            ${reserve.status === "in_progress" && "text-gray-500"}
            ${reserve.status === "completed" && "text-green-500"}
          `}
              >
                {reserve.status === "pending" && "Pendiente"}
                {reserve.status === "canceled" && "Cancelada"}
                {reserve.status === "paid" && "Pagado"}
                {reserve.status === "in_progress" && "En Progreso"}
                {reserve.status === "completed" && "Completado"}
              </td>
              <td>{reserve.room.category}</td>
              <td>{reserve.room.number}</td>
              <td>{reserve.price}</td>
              <td>{reserve.startDate}</td>
              <td>{reserve.endDate}</td>
              <td>
                <Link href={`/admin/reservations/${reserve.id}`}>
                  <button className="button-detail">
                    <span className="icon"></span>
                  </button>
                </Link>
              </td>
              <td>
                <CancelCheckbox reserve={reserve} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Reserves;
