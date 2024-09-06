"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/app/context/cart-context";

const formSchema = z.object({
  guestName1: z
    .string()
    .min(4, {
      message: "Mínimo 4 caracteres.",
    })
    .max(16, {
      message: "Máximo 16 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "No puede contener números.",
    }),
  guestLastName1: z
    .string()
    .min(4, {
      message: "Mínimo 4 caracteres.",
    })
    .max(16, {
      message: "Máximo 16 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "No puede contener números.",
    }),
  guestName2: z
    .string()
    .min(4, {
      message: "Mínimo 4 caracteres.",
    })
    .max(16, {
      message: "Máximo 16 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "No puede contener números.",
    }),
  guestLastName2: z
    .string()
    .min(4, {
      message: "Mínimo 4 caracteres.",
    })
    .max(16, {
      message: "Máximo 16 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "No puede contener números.",
    }),
  guestName3: z
    .string()
    .min(4, {
      message: "Mínimo 4 caracteres.",
    })
    .max(16, {
      message: "Máximo 16 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "No puede contener números.",
    }),
  guestLastName3: z
    .string()
    .min(4, {
      message: "Mínimo 4 caracteres.",
    })
    .max(16, {
      message: "Máximo 16 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "No puede contener números.",
    }),
});

export function Guests({ category }: { category: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName1: "",
      guestLastName1: "",
      guestName2: "",
      guestLastName2: "",
      guestName3: "",
      guestLastName3: "",
    },
  });
  const { reserve, updateReserve } = useCart();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const guestNames = [
      { firstName: values.guestName1, lastName: values.guestLastName1 },
      { firstName: values.guestName2, lastName: values.guestLastName2 },
      { firstName: values.guestName3, lastName: values.guestLastName3 },
    ];
    updateReserve({
      ...reserve,
      guests: guestNames,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap w-full justify-around items-center "
      >
        <FormField
          control={form.control}
          name="guestName1"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#faf9f5] border border-orange-300"
                  placeholder="Nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-60 " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guestLastName1"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#faf9f5] border border-orange-300"
                  placeholder="Apellido"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-60 " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guestName2"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#faf9f5] border border-orange-300"
                  placeholder="Nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-60 " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guestLastName2"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#faf9f5] border border-orange-300"
                  placeholder="Apellido"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-60" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="guestName3"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#faf9f5] border border-orange-300"
                  placeholder="Nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-60" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="guestLastName3"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input
                  className=" bg-[#faf9f5] border border-orange-300"
                  placeholder="Apellido"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-60 " />
            </FormItem>
          )}
        />{" "}
        <Button
          className=" mt-3 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}
