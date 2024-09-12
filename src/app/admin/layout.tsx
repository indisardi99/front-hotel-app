"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VerticalNavbar from "@/components/admin-components/admin-navbar/vertical-navbar";
import NavbarAdmin from "@/components/admin-components/navbarAdmin/navbarA";
import { useAuth } from "@/app/context/auth-context";
import Loader from "@/components/loader-admin/loaderAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push("/unauthorized");
      } else if (user.role !== "admin" && user.role !== "employee") {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [user?.role, router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 w-full bg-black text-white navbar">
        <NavbarAdmin />
      </div>
      <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-gray-800 text-white vertical-navbar">
        <VerticalNavbar />
      </div>

      <div className="ml-64 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
