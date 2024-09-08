"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type Reserve = {
  roomId?: string;
  category?: string;
  guestsNumber?: string;
  roomPrice?: number;
  services?: Array<{ name: string; price: number }>;
  startDate?: string;
  endDate?: string;
  guests?: Array<Guest>;
};

export type Guest = {
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

  useEffect(() => {
    const storedReserve = localStorage.getItem("reserve");
    if (storedReserve) {
      setReserve(JSON.parse(storedReserve));
    }
  }, []);

  const updateReserve = (newReserve: Reserve) => {
    setReserve(newReserve);
    localStorage.setItem("reserve", JSON.stringify(newReserve));
  };

  return (
    <CartContext.Provider value={{ reserve, updateReserve }}>
      {children}
    </CartContext.Provider>
  );
};
