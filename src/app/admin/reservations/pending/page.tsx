import Link from "next/link";
import "../styles.css";
import CancelCheckbox from "../CancelCheckbox";
async function getReserves() {
  const uniqueParam = Date.now();
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

async function ReservesPending({ params }: any) {
  const reserves1 = await getReserves();
  const reserves = reserves1.data;

  const reserves_paid = reserves.filter(
    (reserves: { status: string }) => reserves.status === "pending"
  );
  const cont = reserves_paid.length;

  const RenderPaginationButtons = () => {
    const buttons = [];
    const totalPages = Math.ceil(cont / 30);

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(<button className="pagination-button">{i}</button>);
    }

    return buttons;
  };

  return (
    <div>
      <div
        className="flex flex-col mt-36"
        style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}
      >
        <Link href="/admin/reservations">
          <h1
            style={{ fontSize: "30px", marginLeft: "150px", marginTop: "55px" }}
          >
            Reservas
          </h1>
        </Link>
        <div
          className="dropdown"
          style={{
            position: "relative",
            paddingTop: "40px",
            paddingLeft: "30px",
          }}
        >
          <div className="filter-container">
            <div
              className="dropdown4"
              style={{
                paddingLeft: "10px",
                paddingTop: "25px",
                paddingRight: "20px",
              }}
            >
              <button style={{ fontSize: "20px" }}>Estatus</button>
              <div className="dropdown-content4">
                <Link href="/admin/reservations/pending/">
                  <p> Pending</p>
                </Link>
                <Link href="/admin/reservations/cancelled/">
                  <p> Cancelled</p>
                </Link>
                <Link href="/admin/reservations/paid/">
                  <p> Paid</p>
                </Link>
                <Link href="/admin/reservations/completed/">
                  <p> Completed</p>
                </Link>
                <Link href="/admin/reservations/inprogress/">
                  <p> In Progress</p>
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
              <button style={{ fontSize: "20px" }}>Categoría</button>
              <div className="dropdown-content2">
                <Link href="/admin/reservations/suite/">
                  <p>Suite</p>
                </Link>
                <Link href="/admin/reservations/suite_premium/">
                  <p>Suite Premium</p>
                </Link>
                <Link href="/admin/reservations/loft/">
                  <p> Loft</p>
                </Link>
                <Link href="/admin/reservations/loft_premium/">
                  <p> Loft Premium</p>
                </Link>
              </div>
            </div>
            <div className="dropdown3">
              <button style={{ fontSize: "20px" }}>Precio</button>
              <div className="dropdown-content3">
                <Link href="/admin/reservations/menos300/">
                  <p> Menos de $300</p>
                </Link>
                <Link href="/admin/reservations/betwenn3001000/">
                  <p> $300 - $1000</p>
                </Link>
                <Link href="/admin/reservations/more1000/">
                  <p> Más de $1000</p>
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
            <th>Status </th>
            <th>Categoría</th>
            <th>Habitación</th>
            <th>Precio</th>
            <th>Fecha Inicio</th>
            <th>Fecha Finalización </th>
            <th>Ver Detalle</th>
            <th className="cancel-column">Cancelar</th>
          </tr>
        </thead>
        <tbody>
          {reserves_paid.map((reserve: any, index: any) => (
            <tr key={reserve.id}>
              <td>{index + 1}</td>
              <td>{reserve.user.email}</td>
              <td>{reserve.status === "pending" && "Pendiente"}</td>
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
                {" "}
                <CancelCheckbox reserve={reserve} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="pagination-container">*/}
      {/*<button className="pagination-button disabled">&lt;</button>
            {/*<button className="pagination-button active">1</button>*/}
      {/*RenderPaginationButtons()*/}
      {/*<span className="pagination-ellipsis">...</span>
            <button className="pagination-button">&gt;</button>
          </div>*/}
    </div>
  );
}

export default ReservesPending;
