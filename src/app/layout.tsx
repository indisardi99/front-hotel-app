import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display as FontSans } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/footer/footer";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eclipse Royal",
  description: "Hotel Eclipse Royal",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body
        className={cn(
          "flex flex-col w-full min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster position="top-center" />
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
