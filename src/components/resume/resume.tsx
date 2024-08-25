import { SummaryProps } from "@/lib/interfaces";
import React from "react";

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
    <div className="summary">
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

      <button onClick={onContinue}>Continue Reservation</button>

      <style jsx>{`
        .summary {
          border: 1px solid #ccc;
          padding: 16px;
          border-radius: 8px;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        h2,
        h3 {
          margin: 8px 0;
        }
        .additional-items ul {
          padding-left: 20px;
          margin: 0;
        }
        button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default Summary;
