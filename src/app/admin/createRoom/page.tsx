'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

interface CreateRoomDto {
  number: number
  price: number
  category: string
  features?: string[]
  images?: string[]
}

const CreateRoom: React.FC = () => {
  const [number, setNumber] = useState<number | undefined>(undefined)
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [availableFeatures, setAvailableFeatures] = useState<any[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [notAvailableNumbers, setNotAvailableNumbers] = useState<number[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const router = useRouter()

  // Fetch initial data for categories, features, and unavailable room numbers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/room/getInfoToCreate`
        )
        const data = await res.json()
        setAvailableCategories(data.availableCategories)
        setAvailableFeatures(data.availableFeatures)
        setNotAvailableNumbers(data.notAvailableNumbers)
      } catch (error) {
        console.error('Error fetching room info:', error)
        toast.error('Error al cargar la información para crear la habitación.')
      }
    }

    fetchData()
  }, [])

  // Enable or disable the create button based on form completion
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/room/getInfoToCreate`
        )
        const data = await res.json()

        if (Array.isArray(data.notAvailableNumbers)) {
          setNotAvailableNumbers(data.notAvailableNumbers)
        } else {
          setNotAvailableNumbers([]) // Asegúrate de que siempre sea un array
          console.error('notAvailableNumbers is not an array')
        }

        setAvailableCategories(data.availableCategories || [])
        setAvailableFeatures(data.availableFeatures || [])
      } catch (error) {
        console.error('Error fetching room info:', error)
        toast.error('Error al cargar la información para crear la habitación.')
      }
    }

    fetchData()
  }, [])

  // Handle feature selection
  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((feature) => feature !== id))
    } else {
      setSelectedFeatures([...selectedFeatures, id])
    }
  }

  // Handle room creation process
  const handleCreateRoom = async () => {
    if (!number || !price || !category) {
      return toast.error('Faltan completar algunos campos.')
    }

    // Check if the room number is already taken
    if (notAvailableNumbers.includes(number)) {
      const closestAvailable = getClosestAvailableNumber(number)
      return toast.error(
        `Ese número de habitación ya existe, puedes usar este: ${closestAvailable}`
      )
    }

    // Step 1: Create the room
    try {
      const createRoomBody: CreateRoomDto = {
        number,
        price,
        category,
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/room/createRoom`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createRoomBody),
        }
      )

      if (!res.ok) throw new Error('Error al crear la habitación.')

      const createdRoom = await res.json()

      // Step 2: Fetch the created room by number to get its ID
      const roomRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/room/getRoomByNumber?number=${number}`
      )
      const roomData = await roomRes.json()
      const roomId = roomData.id

      // Step 3: Add features to the room
      if (selectedFeatures.length > 0) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/room/addFeatures/${roomId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ featuresId: selectedFeatures }),
          }
        )
      }

      // Step 4: Upload the room image (if selected)
      if (image) {
        const formData = new FormData()
        formData.append('file', image)

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files/uploadRoomImage/${roomId}`,
          {
            method: 'POST',
            body: formData,
          }
        )
      }

      Swal.fire(
        '¡Hecho!',
        'La habitación ha sido creada con éxito.',
        'success'
      ).then(() => {
        router.push('/admin/habitaciones')
      })
    } catch (error) {
      console.error('Error creating room:', error)
      toast.error('Error al crear la habitación.')
    }
  }

  // Utility function to find the closest available room number
  const getClosestAvailableNumber = (number: number) => {
    const availableNumbers = Array.from(
      { length: 100 },
      (_, i) => i + 1
    ).filter((num) => !notAvailableNumbers.includes(num))

    return availableNumbers.reduce((prev, curr) =>
      Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev
    )
  }

  return (
    <div className="p-2 mx-auto">
      <Link
        href="/admin/habitaciones"
        className="text-black underline mb-2 block text-sm"
      >
        ← Volver
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Crear Habitación</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Formulario */}
        <div className="col-span-1 flex flex-col gap-2 bg-gray-100 p-3 rounded-md shadow-md h-full">
          <label htmlFor="roomNumber" className="font-semibold text-sm">
            Número
          </label>
          <input
            id="roomNumber"
            type="number"
            placeholder="número"
            value={number || ''}
            onChange={(e) => setNumber(parseInt(e.target.value) || undefined)}
            className="p-1 border border-gray-300 rounded-md text-sm"
          />

          <label htmlFor="roomPrice" className="font-semibold text-sm">
            Precio
          </label>
          <input
            id="roomPrice"
            type="number"
            placeholder="precio"
            value={price || ''}
            onChange={(e) => setPrice(parseInt(e.target.value) || undefined)}
            className="p-1 border border-gray-300 rounded-md text-sm"
          />

          <label htmlFor="roomCategory" className="font-semibold text-sm">
            Categoría
          </label>
          <select
            id="roomCategory"
            className="p-1 border border-gray-300 rounded-md text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="roomImage" className="font-semibold text-sm">
            Imagen
          </label>
          <input
            id="roomImage"
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="p-1 border border-gray-300 rounded-md text-sm"
          />

          <div className="flex justify-between mt-4">
            <button
              onClick={handleCreateRoom}
              className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600`}
              // disabled={isButtonDisabled}
            >
              Crear
            </button>
          </div>
        </div>

        {/* Características */}
        <div className="col-span-2 bg-gray-100 p-3 rounded-md shadow-md h-full">
          <h2 className="text-lg font-semibold mb-2">
            Agregar características:
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {availableFeatures.map((feature) => (
              <button
                key={feature.id}
                className={`p-2 rounded-md ${
                  selectedFeatures.includes(feature.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
                onClick={() => toggleFeature(feature.id)}
              >
                {feature.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
