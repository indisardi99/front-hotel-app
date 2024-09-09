import React, { useState } from 'react'
import Swal from 'sweetalert2'

interface FeatureCardProps {
  id: string
  name: string
  onUpdate: () => void
}

const FeatureCardAdmin: React.FC<FeatureCardProps> = ({
  id,
  name,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const [originalName, setOriginalName] = useState(name)
  const [hasChanges, setHasChanges] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
    setOriginalName(editedName) // Guardar el nombre original
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value)
    setHasChanges(true)
  }

  const handleUpdateClick = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/features/updateFeature/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: editedName }),
        }
      )

      if (!res.ok) {
        throw new Error('Error al actualizar la característica')
      }

      Swal.fire({
        icon: 'success',
        title: 'Característica actualizada',
        text: 'La característica ha sido actualizada con éxito.',
      })

      setIsEditing(false)
      setHasChanges(false)
      onUpdate() // Refrescar la lista de características tras actualizar
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la característica.',
      })
    }
  }

  const handleCancelClick = () => {
    setEditedName(originalName) // Restaurar el nombre original
    setIsEditing(false)
    setHasChanges(false)
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-full bg-white flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-2">
        Característica:{' '}
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          name
        )}
      </h2>
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

export default FeatureCardAdmin
