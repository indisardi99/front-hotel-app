"use client";

import React from "react";

interface FiltersSummaryProps {
  filters: {
    category?: string;
    maxPrice?: number;
    minPrice?: number;
    startDate?: string;
    endDate?: string;
  };
}

const FiltersSummary: React.FC<FiltersSummaryProps> = ({ filters }) => {
  return <></>;
};

export default FiltersSummary;
