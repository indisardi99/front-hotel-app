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
import { useAuth } from "@/app/context/auth-context";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." }),
  password: z
    .string()
    .min(3, { message: "La contraseña debe tener por lo menos 8 caracteres." })
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
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(
          {
            email: values.email,
            role: data.role,
            id: data.id,
            name: data.name,
            phone: data.phone,
            address: data.adress,
          },
          data.token
        );
        toast.success("ingresando a Eclipse Royal");
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error("Error al ingresar", errorData.message);
      }
    } catch (error) {
      toast.error("Error al conectar con el backend:");
    }
  }

  const router = useRouter();

  function onRegister() {
    router.push("/register");
  }

  function handleGoogleLogin() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/googleLogin`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center "
      >
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
        <Button
          className=" mt-4 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
          type="submit"
        >
          Ingresar
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-black">¿Aún no estás registrado?</p>
        <Button
          onClick={onRegister}
          type="submit"
          className=" mt-4 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
        >
          Registrarme
        </Button>
      </div>
      <Button
        onClick={handleGoogleLogin}
        type="submit"
        className=" mt-4 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
      >
        Ingresar con google
      </Button>
    </Form>
  );
}
