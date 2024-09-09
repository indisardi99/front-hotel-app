import Link from 'next/link'

interface RoomCardProps {
  id: string
  number: number
  price: number
  category: string
}

const RoomCardAdmin: React.FC<RoomCardProps> = ({
  id,
  number,
  price,
  category,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-md w-64">
      <h2 className="text-xl font-semibold mb-2">Habitación {number}</h2>
      <p className="text-gray-700 mb-2">Categoría: {category}</p>
      <p className="text-gray-700 mb-4">Precio: ${price}</p>
      <Link
        href={`/admin/detailRoom/${id}`}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Editar
      </Link>
    </div>
  )
}

export default RoomCardAdmin
