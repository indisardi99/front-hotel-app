const PayOk = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Gracias por tu pago. Tu reserva ha sido confirmada.
      </p>
      <button
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        // onClick={() => (window.location.href = "/profile")}
      >
        Ver Mis Reservas
      </button>
    </div>
  );
};

export default PayOk;
