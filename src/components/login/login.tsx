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
import { FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
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
            role: data.user.role,
            id: data.user.id,
            name: data.user.name,
            phone: data.user.phone,
            address: data.user.adress,
          },
          data.token
        );
        toast.success("ingresando a Eclipse Royal");
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error("correo o contraseña incorrectos", errorData.message);
      }
    } catch (error) {
      toast.error("Error de servidor, intenta mas tarde");
    }
  }

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
        className="flex flex-col w-full justify-center items-center "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="m-4">
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  className="w-[310px] bg-[#faf9f5] border border-orange-300"
                  type="email"
                  placeholder="Tu correo"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="m-6">
              <FormLabel>Contraseña</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    className="w-[310px] bg-[#faf9f5] border border-orange-300 pr-10"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Tu contraseña"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {passwordVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <FormMessage className="absolute flex flex-col w-72 m-1" />
            </FormItem>
          )}
        />

        <Button
          className=" mt-10 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
          type="submit"
        >
          Ingresar
        </Button>
      </form>

      <Button
        onClick={handleGoogleLogin}
        type="submit"
        className="shadow-xl mt-4 w-[290px]  hover:bg-orange-200 bg-[#faf9f5] border border-orange-300 h-[40px] text-black mb-[15px]"
      >
        <FaGoogle className="mr-2" /> Ingresar con Google
      </Button>
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
    </Form>
  );
}
