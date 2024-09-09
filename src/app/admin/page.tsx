// pages/guide.tsx

import React from 'react'

const AdminPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-8" style={{ paddingTop: '11rem' }}>
      <h1 className="text-4xl font-bold border-b-2 border-gray-600 pb-4 mb-8">
        Guía del Administrador del Hotel
      </h1>
      <p className="mb-6">
        Bienvenido a la <strong>sección de administración</strong> de nuestro
        sistema de gestión hotelera. Esta guía está diseñada para proporcionarte
        una comprensión detallada y completa de las diversas funciones y
        herramientas disponibles para los administradores. Asegúrate de
        familiarizarte con cada sección para gestionar eficazmente todas las
        operaciones del hotel.
      </p>

      <h2 className="text-3xl font-bold border-b border-gray-600 pb-2 mb-6">
        1. Gestión de Habitaciones
      </h2>
      <p className="mb-4">
        La sección de <strong>Habitaciones</strong> es el núcleo para la
        administración de las unidades disponibles en el hotel. Aquí podrás
        consultar una lista exhaustiva de todas las habitaciones, incluyendo
        detalles esenciales como el número de habitación, categoría,
        características y más.
      </p>
      <p className="mb-4">
        Cada habitación está acompañada por un botón verde de{' '}
        <strong>editar</strong>, que te permitirá acceder a un panel donde
        podrás modificar la información de la habitación de manera detallada.
      </p>

      <h3 className="text-2xl font-semibold mt-6">Edición de Habitaciones</h3>
      <p className="mb-4">
        En la <strong>sección de edición de habitaciones</strong>, podrás
        realizar los siguientes cambios:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Número de habitación:</strong> Modifica el identificador único
          de la habitación.
        </li>
        <li>
          <strong>Características:</strong> Actualiza las especificaciones y
          atributos únicos de la habitación.
        </li>
        <li>
          <strong>Categoría:</strong> Cambia la clasificación de la habitación
          según su tipo o nivel de servicio.
        </li>
        <li>
          <strong>Precio:</strong> Ajusta el costo de la habitación de acuerdo
          con la temporada o políticas tarifarias.
        </li>
        <li>
          <strong>Imagen:</strong> Sustituye o actualiza la imagen
          representativa de la habitación.
        </li>
      </ul>
      <p className="mb-4">
        Tienes la opción de modificar una habitación individualmente o aplicar
        cambios en todas las habitaciones de una categoría específica.
      </p>

      <div className="bg-gray-700 border-l-4 border-red-500 p-4 mb-6 rounded">
        <p>
          <strong>PRECAUCIÓN:</strong> Si decides cambiar el número de una
          habitación, asegúrate de que el cambio se aplique únicamente a la
          habitación específica. Cambiar el número de habitación de manera
          general afectará todas las habitaciones dentro de la misma categoría.
        </p>
      </div>

      <h3 className="text-2xl font-semibold mt-6">Creación de Habitaciones</h3>
      <p className="mb-4">
        Para agregar nuevas habitaciones, utiliza el formulario de creación de
        habitaciones. Este formulario requiere que ingreses toda la información
        necesaria, como número, características, categoría, precio y una imagen
        representativa. Asegúrate de revisar todos los datos antes de guardar
        para evitar errores.
      </p>

      <h2 className="text-3xl font-bold border-b border-gray-600 pb-2 mb-6">
        2. Gestión de Usuarios
      </h2>
      <p className="mb-4">
        En la sección de <strong>Gestión de Usuarios</strong>, podrás revisar
        una lista completa de todos los usuarios del sistema. Esta lista incluye
        información crítica como nombres, roles, direcciones de correo
        electrónico y otros datos importantes.
      </p>
      <p className="mb-4">
        También tendrás la capacidad de editar la información de los usuarios,
        lo que te permitirá actualizar detalles específicos según sea necesario.
        Después de realizar cualquier modificación, asegúrate de guardar los
        cambios correctamente.
      </p>

      <div className="bg-gray-700 border-l-4 border-red-500 p-4 mb-6 rounded">
        <p>
          <strong>PRECAUCIÓN:</strong> La información de los usuarios es
          altamente sensible y debe ser modificada solo cuando sea absolutamente
          necesario. Asegúrate de comunicar cualquier cambio significativo al
          usuario afectado para mantener la transparencia y confianza.
        </p>
      </div>

      <h2 className="text-3xl font-bold border-b border-gray-600 pb-2 mb-6">
        3. Gestión de Características
      </h2>
      <p className="mb-4">
        La <strong>Gestión de Características</strong> te permite administrar
        todas las características disponibles para las habitaciones. Puedes
        visualizar una lista de todas las características actuales y realizar
        ediciones o adiciones según sea necesario.
      </p>
      <p className="mb-4">
        Para editar una característica existente, selecciona la opción de
        edición junto a la característica deseada. Para agregar una nueva
        característica, utiliza el formulario de creación disponible en esta
        sección.
      </p>

      <h2 className="text-3xl font-bold border-b border-gray-600 pb-2 mb-6">
        4. Gestión de Servicios
      </h2>
      <p className="mb-4">
        En la sección de <strong>Gestión de Servicios</strong>, puedes gestionar
        todos los servicios ofrecidos por el hotel. Aquí podrás:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Ver la lista de servicios:</strong> Consulta todos los
          servicios disponibles actualmente.
        </li>
        <li>
          <strong>Editar nombres y precios:</strong> Actualiza los nombres y
          tarifas de los servicios según sea necesario.
        </li>
        <li>
          <strong>Desactivar servicios:</strong> Oculta temporalmente servicios
          para que no aparezcan en la lista de servicios disponibles al momento
          de hacer una reserva.
        </li>
        <li>
          <strong>Reactivar servicios:</strong> Vuelve a habilitar servicios
          previamente desactivados.
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6">Creación de Servicios</h3>
      <p className="mb-4">
        Para agregar nuevos servicios, completa el formulario de creación de
        servicios. Este formulario te permitirá ingresar toda la información
        relevante para cada nuevo servicio que desees ofrecer en el hotel.
      </p>

      <h2 className="text-3xl font-bold border-b border-gray-600 pb-2 mb-6">
        5. Generación Mensual
      </h2>
      <p className="mb-4">
        La sección de <strong>Generación Mensual</strong> proporciona una vista
        detallada de los ingresos generados por el hotel a lo largo de cada mes
        del año. Además de visualizar las ganancias mensuales, esta función
        ofrece una lista completa de todas las reservas realizadas durante el
        mes seleccionado.
      </p>
      <p className="mb-4">
        Los administradores pueden ingresar el mes y el año deseado y obtener
        los resultados rápidamente mediante un sencillo botón.
      </p>
      <p className="mb-4">
        Cada reserva del mes se presenta en tarjetas individuales con detalles
        importantes como el nombre del cliente, habitación asignada, precio
        pagado, fechas de inicio y fin, y el estado de la reserva. Esto permite
        evaluar fácilmente el desempeño económico y operativo del hotel,
        proporcionando datos clave para la toma de decisiones.
      </p>
      <p className="mb-8">
        Esta sección está diseñada exclusivamente para roles especializados con
        acceso a informes financieros, permitiendo monitorear y analizar las
        tendencias de ingresos y rendimiento financiero del hotel.
      </p>

      <p className="mt-8">
        Gracias por utilizar esta guía. Si necesitas asistencia adicional o
        tienes alguna pregunta, no dudes en preguntar a nuestro equipo de
        programadores.
      </p>
    </div>
  )
}

export default AdminPage
