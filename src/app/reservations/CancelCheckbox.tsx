'use client';

import { useState } from 'react';

export default function CancelCheckbox({ reserve }:any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Estado para controlar el estado del checkbox
  const [update, setUpdate] = useState(false); // Estado adicional para controlar el re-render

  const handleCancel = (event:any) => {
    const checked = event.target.checked;
    setIsChecked(checked); // Actualizamos el estado del checkbox

    if (checked) {
      setIsModalOpen(true); // Solo mostramos el modal si el checkbox se selecciona
    }
  };

  async function confirmCancel  () {
    const res = await fetch(`https://pf-eclipseroyale-qd2v.onrender.com/reservation/cancel/${reserve.id}`, {
        method: 'PUT'
    });
    
    setIsModalOpen(false);
    const data = await res.json();
    console.log("Reserva Cancelada: " ,data);

    // Forzar el re-render después de cancelar la reserva
    setUpdate(update => !update);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsChecked(false); 
    
    // Forzar el re-render sin recargar la página
    setUpdate(prevUpdate => !prevUpdate);
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={handleCancel} className='cancel-column'/>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Seguro que quiere cancelar esta reserva?</p>
            <button className="confirm-btn" onClick={confirmCancel}>
              Confirmar Cancelación
            </button>
            <button className="close-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


