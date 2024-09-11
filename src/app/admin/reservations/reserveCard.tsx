"use client";
import Link from "next/link";
import CancelCheckbox from "./CancelCheckbox";

function ReserveCard({ reserve }: { reserve: any }) {
  // Verificar si reserve y reserve.room están definidos
  const roomImages = reserve?.room?.images || [];
  const imageSrc = roomImages.length > 0 ? roomImages[0] : "default_image_url"; // URL de imagen predeterminada

  return (
    <div className="flex flex-col mt-36">
      <table>
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Email</th>
            <th>Número Telefónico</th>
            <th>Usuarios Registrados</th>
            <th>Estatus </th>
            <th>Categoría</th>
            <th>Habitación</th>
            <th>Precio Total</th>
            <th>Fecha Inicio</th>
            <th>Fecha Finalización </th>
            <th className="cancel-column"> Cancelar</th>
          </tr>
        </thead>
        <tbody>
          <tr key={reserve.id}>
            <td>{reserve.id}</td>
            <td>{reserve.user.email}</td>
            <td>{reserve.user.phone}</td>
            <td>
              {reserve.guestName1} {reserve.guestLastName1} ,
              {reserve.guestName2} {reserve.guestLastName2} ,{" "}
              {reserve.guestName3} {reserve.guestLastName3}
            </td>
            <td>
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
              {" "}
              <CancelCheckbox reserve={reserve} />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={imageSrc}
          alt="Imagen de la habitación de la reserva"
          style={{
            width: "300px",
            height: "auto",
            borderRadius: "8px",
            marginRight: "20px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default ReserveCard;
