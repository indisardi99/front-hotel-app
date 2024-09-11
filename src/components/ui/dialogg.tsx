import { useState } from "react";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import {
  Dialog,
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
      <DialogContent className="absolute shadow-lg border-red-400 flex flex-col items-center justify-center w-[320px] h-[250px] bg-white p-6  rounded-lg">
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
          >
            {isCanceled ? "Reserva Cancelada" : "Sí, cancelar reserva"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelReservationModal;
