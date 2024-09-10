"use client";

import { useAuth } from "@/app/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { createCardToken } from "@mercadopago/sdk-react";

function Search() {
  const router = useRouter();
  const { login } = useAuth();

  const searchParams = useSearchParams();
  const stateUrl = searchParams.get("state");
  const state = stateUrl ? JSON.parse(decodeURIComponent(stateUrl)) : false;

  useEffect(() => {
    const token = jwtDecode<any>(state.access_token);
    if (state?.user) {
      login(
        { ...state.user, authProvider: "google", id: token?.id },
        state.access_token
      );
      toast.success("ingresando a Eclipse Royal");
      router.push("/");
    } else {
      toast.error("Error al ingresar");
      router.push("/login");
    }
  }, []);

  return <></>;
}

export default function Auth() {
  return (
    <div>
      <Suspense>
        <Search />
      </Suspense>
    </div>
  );
}
