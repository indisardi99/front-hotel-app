"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";

const Search: React.FC<{ searchParams: Record<string, any> }> = ({
  searchParams,
}) => {
  const { updateReserve } = useCart();
  const router = useRouter();

  const previousParams = useRef(searchParams);

  useEffect(() => {
    if (previousParams.current !== searchParams) {
      const reserveData = {
        category: searchParams.category,
        roomPrice: searchParams.maxPrice,
        startDate: searchParams.startingDate,
        endDate: searchParams.endingDate,
      };

      updateReserve(reserveData);
      previousParams.current = searchParams;
    }
  }, [searchParams, updateReserve]);

  return null;
};

export default Search;
