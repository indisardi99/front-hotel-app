import VerticalNavbar from '@/components/admin-navbar/vertical-navbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      {/* Barra de navegación fija */}
      <VerticalNavbar />
      {/* Contenido dinámico de cada sección */}
      <div className="ml-64 p-10 flex-1">{children}</div>
    </div>
  )
}
