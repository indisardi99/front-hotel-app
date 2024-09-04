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
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

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

export function EditProfile() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      oldPassword: "",
      address: user?.address || "",
      role: user?.role || "",
      phone: user?.phone?.toString() || "",
      image: user?.image || "",
      status: user?.status || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error("Usuario no autenticado");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`,
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
            role: values.role,
            phone: values.phone,
            image: values.image,
            status: values.status,
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
        className="flex flex-col w-full justify-center items-center"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="Tu nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  type="email"
                  placeholder="Tu Correo"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Nueva Contraseña</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  type="password"
                  placeholder="Nueva contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Contraseña Antigua</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  type="password"
                  placeholder="Contraseña antigua"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="Calle y Altura"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="Rol del usuario"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="11 22334455"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Imagen de Perfil (URL)</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="URL de la imagen"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="mb-12">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  placeholder="Estado del usuario"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />

        <Button
          className="mt-4 w-[290px] hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
          type="submit"
        >
          Actualizar Perfil
        </Button>
      </form>
    </Form>
  );
}

export default EditProfile;
