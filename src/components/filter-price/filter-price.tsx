"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const priceSchema = z.object({
  minPrice: z
    .number()
    .min(60, { message: "El precio mínimo no puede ser inferior a 60." })
    .max(200, { message: "El precio mínimo no puede superar los 200." }),
  maxPrice: z
    .number()
    .min(60, { message: "El precio máximo no puede ser inferior a 60." })
    .max(200, { message: "El precio máximo no puede superar los 200." }),
  // .refine(
  //   (maxPrice, context) => maxPrice >= context.parent.minPrice,
  //   "El precio máximo debe ser mayor o igual al precio mínimo."
  // ),
});

const PriceFilter: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      minPrice: 60,
      maxPrice: 200,
    },
  });

  const onSubmit = (data: { minPrice: number; maxPrice: number }) => {
    console.log("Filtered by prices:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col justify-center lg:flex-row items-center"
    >
      <div className="flex flex-row items-center ">
        <Controller
          name="minPrice"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <Input
                {...field}
                type="number"
                placeholder="Precio mínimo"
                className="w-32 border border-orange-300  rounded-md bg-[#faf9f5]"
              />
              {errors.minPrice && (
                <span className="text-red-500 text-xs">
                  {errors.minPrice.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
              <Input
                {...field}
                type="number"
                placeholder="Precio máximo"
                className="w-32 border ml-2 border-orange-300  rounded-md bg-[#faf9f5]"
              />
              {errors.maxPrice && (
                <span className="text-red-500 text-xs">
                  {errors.maxPrice.message}
                </span>
              )}
            </div>
          )}
        />
      </div>
      <Button
        type="submit"
        className="bg-[#faf9f5] m-2 border border-orange-300 p-2 text-gray-700"
      >
        Filtrar
      </Button>
    </form>
  );
};

export default PriceFilter;
