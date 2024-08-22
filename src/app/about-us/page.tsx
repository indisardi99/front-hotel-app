import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="w-full flex flex-col items-center bg-white ">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
          Sobre Nosotros
        </h2>

        <div className="bg-black lg:mx-32 rounded-md">
          <Image
            src="/loftt.jpg"
            alt="Loft en Eclipse Royal"
            width={1250}
            height={0}
            className="mb-6 rounded-lg opacity-50 shadow-lg"
          />
        </div>
        <div className="bg-white lg:mx-32 m-4 rounded-md">
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">
            Nuestros Lofts
          </h3>
          <p className="text-lg text-gray-600">
            Nuestros lofts están diseñados para ofrecer un espacio abierto y
            moderno, ideal para parejas que buscan una experiencia íntima y
            relajante. Cada loft está equipado con muebles de lujo, vistas
            panorámicas al océano y todas las comodidades que necesitas para una
            estancia inolvidable.
          </p>
        </div>

        <div className="bg-black lg:mx-32 rounded-md">
          <Image
            src="/suite.jpg"
            alt="Suite en Eclipse Royal"
            width={1250}
            height={0}
            className="mb-6 rounded-lg opacity-50 shadow-lg"
          />
        </div>
        <div className="bg-white lg:mx-32 m-4 rounded-md">
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">
            Nuestras Suites
          </h3>
          <p className="text-lg text-gray-600">
            Las suites en Eclipse Royal están pensadas para los huéspedes más
            exigentes, ofreciendo un espacio amplio y elegante. Con una
            decoración sofisticada, camas king-size, y un balcón privado con
            vistas impresionantes, nuestras suites garantizan una estancia llena
            de lujo y confort.
          </p>
        </div>
        <div className="bg-black lg:mx-32 rounded-md">
          <Image
            src="/piscina.jpg"
            alt="Piscina en Eclipse Royal"
            width={1250}
            height={0}
            className="mb-6 rounded-lg opacity-50 shadow-lg"
          />
        </div>
        <div className="bg-white lg:mx-32 m-4 rounded-md">
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">Piscina</h3>
          <p className="text-lg text-gray-600">
            Nuestra piscina es el lugar perfecto para relajarse bajo el sol
            tropical. Rodeada de exuberante vegetación, la piscina ofrece un
            ambiente tranquilo y sereno donde puedes disfrutar de un refrescante
            chapuzón o relajarte en una cómoda tumbona con un cóctel en mano.
          </p>
        </div>
        <div className="bg-black lg:mx-32 rounded-md">
          <Image
            src="/gym.jpg"
            alt="Gimnasio en Eclipse Royal"
            width={1250}
            height={0}
            className="mb-6 rounded-lg opacity-50 shadow-lg"
          />
        </div>
        <div className="bg-white lg:mx-32 m-4 rounded-md">
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">
            Gimnasio
          </h3>
          <p className="text-lg text-gray-600">
            Para aquellos que desean mantenerse en forma durante su estancia,
            nuestro gimnasio está equipado con máquinas de última generación. Ya
            sea que prefieras hacer cardio o entrenamiento de fuerza, nuestras
            instalaciones te permiten seguir con tu rutina de ejercicios
            mientras disfrutas de las vistas al jardín.
          </p>
        </div>

        <div className="bg-black lg:mx-32 rounded-md">
          <Image
            src="/jardin.jpg"
            alt="Área de estar en el jardín "
            width={1250}
            height={0}
            className="mb-6 rounded-lg opacity-50 shadow-lg"
          />
        </div>
        <div className="bg-white lg:mx-32 m-4 rounded-md">
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">
            Área de Estar en el Jardín
          </h3>
          <p className="text-lg text-gray-600">
            El jardín interno es un oasis de paz donde nuestros huéspedes pueden
            desconectar y disfrutar de la naturaleza. Con cómodas áreas de
            estar, es el lugar ideal para leer un libro, meditar, o simplemente
            disfrutar del sonido de la naturaleza mientras te relajas cerca de
            la piscina.
          </p>
        </div>

        <div className="bg-black lg:mx-32 rounded-md">
          <Image
            src="/desayuno.jpg"
            alt="Desayuno Continental en Eclipse Royal"
            width={1250}
            height={0}
            className="mb-6 rounded-lg opacity-50 shadow-lg"
          />
        </div>
        <div className="bg-white lg:mx-32 m-4 rounded-md">
          <h3 className="mb-4 text-2xl font-semibold text-gray-700">
            Desayuno Continental
          </h3>
          <p className="text-lg text-gray-600">
            Cada mañana, nuestros huéspedes pueden disfrutar de un delicioso
            desayuno americano, preparado con los ingredientes más frescos.
            Servido en un ambiente elegante y acogedor, nuestro desayuno es la
            mejor manera de comenzar el día antes de explorar todo lo que
            Eclipse Royal y sus alrededores tienen para ofrecer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;