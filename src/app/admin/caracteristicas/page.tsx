'use client'
import { useEffect, useState } from 'react'
import FeatureCardAdmin from '@/components/feature-card-admin/feature-card-admin'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

interface Feature {
  id: string
  name: string
}

const FeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newFeatureName, setNewFeatureName] = useState('')

  const fetchFeatures = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/features/getAllFeatures`
      )

      if (!res.ok) {
        throw new Error('Error al obtener las características')
      }

      const features: Feature[] = await res.json()
      setFeatures(features)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al obtener las características.',
      })
    }
  }

  useEffect(() => {
    fetchFeatures()
  }, [])

  const handleCreateFeature = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/features/createFeature`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newFeatureName }),
        }
      )

      if (!res.ok) {
        throw new Error('Error al crear la característica')
      }

      Swal.fire({
        icon: 'success',
        title: 'Característica creada',
        text: 'La nueva característica ha sido creada con éxito.',
      })

      setNewFeatureName('') // Limpiar el input
      setIsCreating(false) // Ocultar el form
      fetchFeatures() // Refrescar la lista de características
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la característica.',
      })
    }
  }

  return (
    <div className="p-7 pt-20 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gestión de Características</h1>
      <p className="mb-4">Aquí puedes ver y gestionar las características.</p>

      {!isCreating ? (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Agregar Característica
        </button>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            value={newFeatureName}
            onChange={(e) => setNewFeatureName(e.target.value)}
            placeholder="Nombre de la característica"
            className="border p-2 rounded w-full"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleCreateFeature}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Crear
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {features.length > 0 ? (
          features.map((feature) => (
            <FeatureCardAdmin
              key={feature.id}
              {...feature}
              onUpdate={() => fetchFeatures()} // Refrescar características tras actualizar
            />
          ))
        ) : (
          <p>No hay características disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default FeaturesPage
