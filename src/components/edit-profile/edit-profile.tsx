"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
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
import { useAuth } from "@/app/context/auth-context";

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "El nombre de usuario no puede contener números.",
    }),
  email: z.string().email({
    message: "Debe ser un correo electrónico válido.",
  }),
  password: z.string().optional(),
  oldPassword: z.string().optional(),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
  role: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d+$/, {
      message: "El número de teléfono solo debe contener dígitos.",
    })
    .min(9, {
      message: "El número de teléfono debe tener al menos 9 dígitos.",
    }),
  image: z
    .string()
    .url({
      message: "Debe ser una URL válida para la imagen.",
    })
    .optional(),
  status: z.string().optional(),
});

export function ProfileEditForm() {
  const { user, updateUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      oldPassword: "",
      address: user?.address || "",
      phone: user?.phone?.toString() || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      console.log(user), toast.error("Usuario no autenticado");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            oldPassword: values.oldPassword,
            address: values.address,
            phone: values.phone,
          }),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        toast.success("Perfil actualizado con éxito.");
      } else {
        toast.error("Error al actualizar el perfil, intenta de nuevo.");
      }
    } catch (error) {
      toast.error("Error del servidor, intenta más tarde.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  placeholder="Tu nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  type="email"
                  placeholder="Tu Correo"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Nueva Contraseña</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  type="password"
                  placeholder="Nueva contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Contraseña Antigua</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  type="password"
                  placeholder="Contraseña antigua"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  placeholder="Calle y Altura"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  placeholder="11 22334455"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
        <Button
          className="col-span-2 mt-4 w-full hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
          type="submit"
        >
          Actualizar Perfil
        </Button>
      </form>
    </Form>
  );
}
