import { useState } from "react";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./dialog";

interface Reservation {
  id: string;
  price: number;
  startDate: string;
  status: string;
  endDate: string;
  room: {
    number: number;
    category: string;
    images: string[];
  };
}

interface CancelReservationModalProps {
  reservation: Reservation;
  onCancel: (reservationId: string) => Promise<void>;
}

const CancelReservationModal = ({
  reservation,
  onCancel,
}: CancelReservationModalProps) => {
  const [isCanceled, setIsCanceled] = useState(false);

  const handleCancel = async () => {
    try {
      await onCancel(reservation.id);
      setIsCanceled(true);
      toast.success("Reserva cancelada con éxito");
    } catch (error) {
      toast.error("Hubo un error al cancelar la reserva.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isCanceled}>
          {isCanceled ? "Reserva Cancelada" : "Cancelar Reserva"}
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative border border-red-600 shadow-lg  flex flex-col items-center justify-center w-[320px] h-[250px] bg-white p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>Cancelar Reserva</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que quieres cancelar esta reserva? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleCancel}
              variant="destructive"
              disabled={isCanceled}
              className="bg-red-400 text-white mt-3 hover:bg-white hover:text-red-600"
            >
              {isCanceled ? "Reserva Cancelada" : "Sí, cancelar reserva"}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className=" bg-green-400 text-white mt-3 hover:text-green-500"
              >
                No, no cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelReservationModal;
