"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cart-context";

const Search: React.FC<{ searchParams: Record<string, any> }> = ({
  searchParams,
}) => {
  const { updateReserve, reserve } = useCart();

  useEffect(() => {
    const reserveData = {
      category: searchParams.category,
      roomPrice: searchParams.maxPrice,
      startDate: searchParams.startingDate,
      endDate: searchParams.endingDate,
      guestsNumber: searchParams.category,
    };
    updateReserve({ ...reserve, ...reserveData });
  }, [searchParams]);

  return <></>;
};

export default Search;
