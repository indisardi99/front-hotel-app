"use client";

import { useAuth } from "@/app/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import toast from "react-hot-toast";

function Search() {
  const router = useRouter();
  const { login } = useAuth();

  const searchParams = useSearchParams();
  const stateUrl = searchParams.get("state");
  const state = stateUrl ? JSON.parse(decodeURIComponent(stateUrl)) : false;

  console.log(
    "stateUrl: ",
    stateUrl,
    " state: ",
    state,
    " searchParams: ",
    searchParams
  );

  useEffect(() => {
    if (state?.user) {
      login({ ...state.user, authProvider: "google" }, state.access_token);
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
