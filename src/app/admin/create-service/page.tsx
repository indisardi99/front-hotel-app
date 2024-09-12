'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useAuth } from '@/app/context/auth-context'

interface Service {
  name: string
  price: number
}

const CreateServicePage: React.FC = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [services, setServices] = useState<Service[]>([])

  const { accessToken } = useAuth()

  const fetchServices = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/getAllServices`
      )
      if (!res.ok) throw new Error('Error al obtener los servicios')
      const services: Service[] = await res.json()
      setServices(services)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al obtener los servicios.',
      })
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleCreateService = async () => {
    if (
      services.some(
        (service) => service.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El servicio ya existe.',
      })
      return
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/createService`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name, price }),
        }
      )

      if (!res.ok) throw new Error('Error al crear el servicio')

      Swal.fire({
        icon: 'success',
        title: 'Servicio creado',
        text: 'El servicio ha sido creado con éxito.',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el servicio.',
      })
    }
  }

  return (
    <div className="p-7 pt-20 mt-20">
      <Link
        href="/admin/servicios"
        className="text-black underline mb-2 block text-sm"
      >
        ← Volver
      </Link>
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Servicio</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del servicio"
          className="border p-2 rounded"
        />
        <input
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Precio del servicio"
          className="border p-2 rounded"
        />
        <button
          onClick={handleCreateService}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Servicio
        </button>
      </div>
    </div>
  )
}

export default CreateServicePage
