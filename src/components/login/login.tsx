"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." }),
  password: z
    .string()
    .min(3, { message: "La contraseña debe tener por lo menos 8 caracteres." })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    }),
  //     .regex(/[A-Z]/, {
  //       message: "La contraseña debe contener al menos una letra mayúscula.",
  //     })
  //     .regex(/[0-9]/, {
  //       message: "La contraseña debe contener al menos un número.",
  //     })
  //     .regex(/[^a-zA-Z0-9]/, {
  //       message: "La contraseña debe contener al menos un carácter especial.",
  //     }),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Error en el login:", errorData.message);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  }

  const router = useRouter();

  function onRegister() {
    router.push("/register");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
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
                <Input type="password" placeholder="Tu contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-black">¿Aún no estás registrado?</p>
        <Button onClick={onRegister} type="button" className=" rounded">
          Registrarme
        </Button>
      </div>
    </Form>
  );
}
