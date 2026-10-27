import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tu Rutina — Poli & Pola",
  description: "Entrenamiento personal para Poli y Pola. Seguí tus sesiones, marcá tus ejercicios y mirá tu progreso semanal.",
  keywords:
    "Rutina de gimnasio, Ejercicios de gimnasio, Entrenamiento de fuerza, Rutina de ejercicios, Rutina de entrenamiento, Ejercicios para aumentar masa muscular, Plan de entrenamiento, Ejercicios de musculación, Ejercicios para perder peso, Entrenamiento físico, Ejercicios de cardio, Ejercicios para definir músculos, Rutina de entrenamiento semanal, Rutina de ejercicios para principiantes, Consejos de fitness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
