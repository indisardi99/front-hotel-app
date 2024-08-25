import { SummaryProps } from "@/lib/interfaces";
import React from "react";
import { Button } from "../ui/button";

const Summary: React.FC<SummaryProps> = ({
  title,
  basePrice,
  additionalItems,
  onContinue,
}) => {
  const totalAdditionalPrice = additionalItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const totalPrice = basePrice + totalAdditionalPrice;

  return (
    <div className="flex flex-col rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <h2>{title}</h2>
      <p>Base Price: ${basePrice.toFixed(2)}</p>

      {additionalItems.length > 0 && (
        <div className="additional-items">
          <h3>Additional Services:</h3>
          <ul>
            {additionalItems.map((item, index) => (
              <li key={index}>
                {item.name}: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <Button onClick={onContinue}> presiona para reservar</Button>
    </div>
  );
};

export default Summary;
