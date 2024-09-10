import React, { useState } from "react";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  phone?: number;
  role: string;
  status: string;
  adress?: string;
  onSuspend: (id: string) => void;
  onReactivate: (id: string) => void;
  onUpdate: (id: string, updatedData: any) => void;
}

const UserCardAdmin: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  phone,
  role,
  status,
  adress,
  onSuspend,
  onReactivate,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name,
    email,
    phone,
    role,
    adress,
  });
  const [originalData, setOriginalData] = useState({
    name,
    email,
    phone,
    role,
    adress,
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalData({ ...editedData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleUpdateClick = () => {
    onUpdate(id, editedData);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleCancelClick = () => {
    setEditedData(originalData);
    setIsEditing(false);
    setHasChanges(false);
  };

  const cardStyle =
    role === "admin" || role === "employee" ? "bg-blue-100" : "bg-white";

  return (
    <div
      className={`p-4 border rounded-md shadow-md w-full ${cardStyle} flex flex-col justify-between`}
      style={{ minHeight: "120px", width: "100%" }}
    >
      <h2 className="text-xl font-semibold mb-2">
        Usuario:{" "}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          name
        )}
      </h2>
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700">
          Email:{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : (
            email
          )}
        </p>
        <p className="text-gray-700">
          Teléfono:{" "}
          {isEditing ? (
            <input
              type="number"
              name="phone"
              value={editedData.phone || ""}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : phone ? (
            phone
          ) : (
            "No tiene número"
          )}
        </p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700">
          Dirección:{" "}
          {isEditing ? (
            <input
              type="text"
              name="adress"
              value={editedData.adress || ""}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : adress ? (
            adress
          ) : (
            "No tiene dirección"
          )}
        </p>
        <p className="text-gray-700">Rol: {role}</p>
      </div>

      <div className="flex justify-end gap-2">
        {status === "active" ? (
          <button
            onClick={() => onSuspend(id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={role === "admin"}
          >
            {role === "admin" ? "Admin - No se puede suspender" : "Suspender"}
          </button>
        ) : (
          <button
            onClick={() => onReactivate(id)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Activar
          </button>
        )}

        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar
          </button>
        )}

        {isEditing && (
          <>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            {hasChanges && (
              <button
                onClick={handleUpdateClick}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Actualizar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserCardAdmin;
