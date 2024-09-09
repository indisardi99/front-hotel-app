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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres.",
    })
    .regex(/^[^0-9]*$/, {
      message: "El nombre de usuario no puede contener números.",
    }),
  password: z.string().optional(),
  oldPassword: z.string().optional(),
  adress: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres.",
  }),
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
});

export function ProfileEditForm() {
  const { user, updateUser } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      password: "",
      oldPassword: "",
      adress: user?.adress || "",
      phone: user?.phone?.toString() || "",
      image: user?.image || "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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
            password: values.password,
            oldPassword: values.oldPassword,
            adress: values.adress,
            phone: values.phone,
            image: values.image,
          }),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        toast.success("Perfil actualizado con éxito.");
        router.push("/view-profile");
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
          name="adress"
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
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Contraseña Antigua</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="w-full bg-[#faf9f5] border border-orange-300"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña antigua"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
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
                <div className="relative">
                  <Input
                    className="w-full bg-[#faf9f5] border border-orange-300"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Imagen de Perfil (URL)</FormLabel>
              <FormControl>
                <Input
                  className="w-full bg-[#faf9f5] border border-orange-300"
                  placeholder="URL de tu imagen"
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
