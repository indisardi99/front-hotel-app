"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type Reserve = {
  roomId: string;
  category: string;
  guestsNumber?: string;
  roomPrice: number;
  services?: Array<{ name: string; price: number }>;
  startDate: string;
  endDate: string;
  guest?: Guest[];
};

type Guest = {
  firstName: string;
  lastName: string;
};

export type CartContextType = {
  reserve: Reserve | null;
  updateReserve: (reserve: Reserve) => void;
};

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType>({
  reserve: null,
  updateReserve: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [reserve, setReserve] = useState<Reserve | null>(null);
  return (
    <CartContext.Provider
      value={{
        reserve,
        updateReserve: (reserve: Reserve) => {
          setReserve(reserve);
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
