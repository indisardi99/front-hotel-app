'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ActivateUser = () => {
  const { id } = useParams()
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/activate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setActivated(true)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [id])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div
        className="bg-gray-900 pr-10 pl-10 pt-20 rounded-lg shadow-lg text-center text-white"
        style={{ paddingBottom: '10em' }}
      >
        {activated ? (
          <>
            <h1 className="text-2xl font-bold mb-4">
              ¡Cuenta activada con éxito!
            </h1>
            <p className="mb-6">
              Tu cuenta ha sido activada y ahora puedes acceder a todas las
              funciones del sitio.
            </p>
            <a
              href="https://front-hotel-app-six.vercel.app/"
              className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md shadow-md hover:bg-yellow-600 transition"
            >
              Volver al inicio
            </a>
          </>
        ) : (
          <h1 className="text-2xl font-bold">Activando usuario...</h1>
        )}
      </div>
    </div>
  )
}

export default ActivateUser
