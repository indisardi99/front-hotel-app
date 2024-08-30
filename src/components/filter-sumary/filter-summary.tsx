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
  return (
    <div className="m-2 p-4 border flex flex-col rounded-md bg-gray-100">
      <h3 className="text-lg flex flex-col font-semibold mb-2">
        Filtros Aplicados
      </h3>
      <ul className="flex flex-row ">
        {filters.category && (
          <li className="m-2">
            <strong>Cantidad de personas seleccionadas:</strong>{" "}
            {filters.category}
          </li>
        )}
        {filters.maxPrice && (
          <li className="m-2">
            <strong>Precio Máximo:</strong> ${filters.maxPrice}
          </li>
        )}
        {filters.minPrice && (
          <li className="m-2">
            <strong>Precio Mínimo:</strong> ${filters.minPrice}
          </li>
        )}
        {filters.startDate && (
          <li className="m-2">
            <strong>Fecha de Inicio:</strong> {filters.startDate}
          </li>
        )}
        {filters.endDate && (
          <li className="m-2">
            <strong>Fecha de Fin:</strong> {filters.endDate}
          </li>
        )}
      </ul>
    </div>
  );
};

export default FiltersSummary;
