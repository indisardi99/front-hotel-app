'use client'
import { useState } from 'react'
import { useAuth } from '@/app/context/auth-context'

interface Reservation {
  id: string
  price: number
  startDate: string
  endDate: string
  status: string
  user: {
    name: string
  }
  room: {
    number: number
  }
}

interface MonthlyProfitResponse {
  monthlyProfit: {
    month: number
    year: number
    profit: number
  }
  reservationsOnThisMonth: Reservation[]
}

const GananciasPage: React.FC = () => {
  const [year, setYear] = useState<number | null>(null)
  const [month, setMonth] = useState<number | null>(null)
  const [profitData, setProfitData] = useState<MonthlyProfitResponse | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  const { accessToken } = useAuth()

  const handleFetchProfit = async () => {
    if (year === null || month === null) {
      setError('Por favor selecciona un mes y un año.')
      return
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/services/getMonthlyProfit`,
        {
          method: 'POST', // Cambiado a POST
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            year,
            month,
          }), // Enviamos los parámetros year y month en el cuerpo
        }
      )

      if (!res.ok) {
        throw new Error(
          'No se encontraron datos para las fechas seleccionadas.'
        )
      }

      const data: MonthlyProfitResponse = await res.json()
      setProfitData(data)
      setError(null)
    } catch (error) {
      setError('No se encontraron datos para las fechas seleccionadas.')
      setProfitData(null)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-7 pt-20 mt-20">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Gestión de Ganancias
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Consulta las ganancias mensuales y revisa las reservas realizadas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Año:
            </label>
            <input
              type="number"
              onChange={(e) => setYear(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej. 2024"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Mes:
            </label>
            <input
              type="number"
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej. 10"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleFetchProfit}
              className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Revisar ganancias
            </button>
          </div>
        </div>

        {error ? (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        ) : profitData ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Ganancias del {profitData.monthlyProfit.month}/
              {profitData.monthlyProfit.year}
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Ganancias Totales:{' '}
              <span className="font-bold text-green-500">
                ${profitData.monthlyProfit.profit}
              </span>
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Reservas del mes:
            </h3>
            {profitData.reservationsOnThisMonth.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profitData.reservationsOnThisMonth.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <p className="font-semibold text-gray-800 mb-2">
                      {reservation.user.name || 'Sin nombre'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Habitación:</strong> {reservation.room.number}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Precio pagado:</strong> ${reservation.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Fecha de inicio:</strong> {reservation.startDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Fecha de fin:</strong> {reservation.endDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Estado:</strong> {reservation.status}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                No se encontraron reservas para este mes.
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Por favor selecciona un mes y un año para revisar las ganancias.
          </p>
        )}
      </div>
    </div>
  )
}

export default GananciasPage
