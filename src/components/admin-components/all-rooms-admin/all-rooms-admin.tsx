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
    <div className="p-4 border rounded-md shadow-md w-full mx-auto flex justify-between items-center gap-8">
      {' '}
      <div className="flex w-full justify-between">
        <h2 className="text-xl font-semibold">Habitación {number}</h2>
        <p className="text-gray-700">Categoría: {category}</p>
        <p className="text-gray-700">Precio: ${price}</p>
      </div>
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
