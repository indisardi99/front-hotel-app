"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PayWrong = () => {
  const router = useRouter();

  function onRetry() {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">¡Pago Fallido!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Hubo un problema con tu pago. Por favor, intenta nuevamente.
      </p>
      <Button
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={onRetry}
        type="button"
      >
        Intentar de Nuevo
      </Button>
    </div>
  );
};

export default PayWrong;
