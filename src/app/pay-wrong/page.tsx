const PayWrong = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">¡Pago Fallido!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Hubo un problema con tu pago. Por favor, intenta nuevamente.
      </p>

      <button
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        // onClick={() => (window.location.href = "/retry-payment")}
      >
        Intentar de Nuevo
      </button>
    </div>
  );
};

export default PayWrong;
