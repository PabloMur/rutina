import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rutina de Gimnasio | Ejercicios para mantenerse en forma",
  description:
    "Descubre una rutina de gimnasio diseñada por Pablo Murillo para ayudarte a mantenerte en forma y saludable. ¡Sigue estos ejercicios y alcanza tus objetivos de fitness!",
  keywords:
    "Rutina de gimnasio, Ejercicios de gimnasio, Entrenamiento de fuerza, Rutina de ejercicios, Rutina de entrenamiento, Ejercicios para aumentar masa muscular, Plan de entrenamiento, Ejercicios de musculación, Ejercicios para perder peso, Entrenamiento físico, Ejercicios de cardio, Ejercicios para definir músculos, Rutina de entrenamiento semanal, Rutina de ejercicios para principiantes, Consejos de fitness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
