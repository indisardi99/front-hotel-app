import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PayOk = () => {
  const router = useRouter();

  function onReservations() {
    router.push("/my-reservations");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Gracias por tu pago. Tu reserva ha sido confirmada.
      </p>
      <Button
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        onClick={onReservations}
        type="button"
      >
        Ver Mis Reservas
      </Button>
    </div>
  );
};

export default PayOk;
