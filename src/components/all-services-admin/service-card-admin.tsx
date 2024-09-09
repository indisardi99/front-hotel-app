import React, { useState } from 'react'

interface ServiceCardProps {
  id: string
  name: string
  price: number
  onUpdate: (id: string, updatedData: any) => void
}

const ServiceCardAdmin: React.FC<ServiceCardProps> = ({
  id,
  name,
  price,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    name,
    price,
  })
  const [originalData, setOriginalData] = useState({
    name,
    price,
  })
  const [hasChanges, setHasChanges] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
    setOriginalData({ ...editedData }) // Guardar datos originales
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
    setHasChanges(true)
  }

  const handleUpdateClick = () => {
    onUpdate(id, editedData)
    setIsEditing(false)
    setHasChanges(false)
  }

  const handleCancelClick = () => {
    setEditedData(originalData) // Restaurar datos originales
    setIsEditing(false)
    setHasChanges(false)
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-full bg-white flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-2">
        Servicio:{' '}
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
          Precio:{' '}
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editedData.price}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : (
            `$${price}`
          )}
        </p>
      </div>
      <div className="flex justify-end gap-2">
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
  )
}

export default ServiceCardAdmin
