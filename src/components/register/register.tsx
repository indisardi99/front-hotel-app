"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres.",
    }),
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
    email: z.string().email({
      message: "Debe ser un correo electrónico válido.",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener por lo menos 8 caracteres.",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula.",
      })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula.",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número.",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "La contraseña debe contener al menos un carácter especial.",
      }),
    confirmPassword: z.string().min(8, {
      message:
        "La confirmación de la contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      adress: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log({
        name: values.name,
        adress: values.adress,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            adress: values.adress,
            phone: values.phone,
            email: values.email,
            password: values.password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Registro exitoso: por favor ingresa");
        router.push("/login");
      } else {
        toast.error("Error en el registro");
      }
    } catch (error) {
      toast.error("Error al conectar con el backend");
    }
  }

  const router = useRouter();

  function onLogin() {
    router.push("/login");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  className="min-w-72 max-w-80 bg-[#faf9f5] border border-orange-300"
                  placeholder="nombre de usuario"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input
                  className="min-w-72 max-w-80 bg-[#faf9f5] border border-orange-300"
                  placeholder="Tu dirección"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input
                  className="min-w-72 max-w-80 bg-[#faf9f5] border border-orange-300"
                  placeholder="11 22334455"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  className="min-w-72 max-w-80 bg-[#faf9f5] border border-orange-300"
                  type="email"
                  placeholder="tu_correo@dominio.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  className="min-w-72 max-w-80 bg-[#faf9f5] border border-orange-300"
                  type="password"
                  placeholder="Tu contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  className="min-w-72 max-w-80 bg-[#faf9f5] border border-orange-300"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-black min-w-16 mt-3 hover:bg-orange-200 bg-[#faf9f5] border border-orange-300"
          type="submit"
        >
          Enviar
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-black">¿ya estas registrado?</p>
        <Button
          className="text-black min-w-16 mt-3 hover:bg-orange-200 bg-[#faf9f5] border border-orange-300"
          onClick={onLogin}
          type="button"
        >
          Ingresar
        </Button>
      </div>
    </Form>
  );
}
