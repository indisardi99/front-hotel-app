'use client'
import { useEffect, useState } from 'react'
import UserCardAdmin from '@/components/all-users-admin/user-card-admin'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

interface User {
  id: string
  name: string
  phone?: number
  email: string
  role: string
  status: string
  adress?: string
}

const UsuariosPage: React.FC = () => {
  const [data, setData] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)

      if (!res.ok) {
        throw new Error('Error al obtener los usuarios')
      }

      const users: User[] = await res.json()
      // Ordenar los usuarios primero por role ('admin' o 'employee') y luego por nombre
      const sortedUsers = users.sort((a, b) => {
        if (a.role === 'admin' || a.role === 'employee') {
          return -1
        }
        if (b.role === 'admin' || b.role === 'employee') {
          return 1
        }
        return a.name.localeCompare(b.name)
      })

      setData(sortedUsers)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al obtener los usuarios.',
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSuspend = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/suspend/${id}`,
        {
          method: 'PUT',
        }
      )

      if (!res.ok) {
        throw new Error('Error al suspender el usuario')
      }

      Swal.fire({
        icon: 'success',
        title: 'Usuario suspendido',
        text: 'El usuario ha sido suspendido con éxito.',
      })
      fetchUsers() // Actualizar la lista después de la acción
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al suspender el usuario.',
      })
    }
  }

  const handleReactivate = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/restore/${id}`,
        {
          method: 'PUT',
        }
      )

      if (!res.ok) {
        throw new Error('Error al reactivar el usuario')
      }

      Swal.fire({
        icon: 'success',
        title: 'Usuario reactivado',
        text: 'El usuario ha sido reactivado con éxito.',
      })
      fetchUsers() // Actualizar la lista después de la acción
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al reactivar el usuario.',
      })
    }
  }

  const handleUpdate = async (id: string, updatedData: Partial<User>) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      )

      if (!res.ok) {
        throw new Error('Error al actualizar el usuario')
      }

      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'El usuario ha sido actualizado con éxito.',
      })
      fetchUsers() // Actualizar la lista después de la acción
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el usuario.',
      })
    }
  }

  return (
    <div className="p-7 pt-20 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <p className="mb-4">Aquí puedes ver y gestionar los usuarios.</p>
      <div className="flex flex-col gap-5">
        {data.length > 0 ? (
          data.map((user) => (
            <UserCardAdmin
              key={user.id}
              {...user}
              onSuspend={handleSuspend}
              onReactivate={handleReactivate}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>
    </div>
  )
}

export default UsuariosPage
