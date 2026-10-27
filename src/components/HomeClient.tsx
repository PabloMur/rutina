"use client";

import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import RutinaCard from "./RutinaCard";
import routinesData from "@/data/routines.json";
import type { UserId, UserRoutine } from "@/types/rutina";

const STORAGE_KEY = "rutina_user";

function HeroSection({ userData }: { userData: UserRoutine | null }) {
  const exerciseCount = userData?.rutina.reduce((total, day) => total + day.groups.reduce((sum, group) => sum + group.exercises.length, 0), 0) ?? 0;

  return (
    <section className="hero relative isolate flex min-h-[500px] items-end overflow-hidden sm:min-h-[520px] lg:min-h-[min(620px,calc(100svh-5rem))]">
      <video src="/rocky.mp4" autoPlay loop muted playsInline aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,10,7,.94)_0%,rgba(6,10,7,.72)_44%,rgba(6,10,7,.3)_100%),linear-gradient(0deg,#0a0d0a_0%,rgba(6,10,7,.12)_56%,rgba(6,10,7,.18)_100%)]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-8 px-5 pb-14 pt-20 sm:px-8 sm:pb-16 md:grid-cols-[minmax(0,1fr)_minmax(230px,.72fr)] md:gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(250px,.55fr)] lg:gap-10 lg:px-12 lg:pb-10 lg:pt-12">
        <div className="animate-rise min-w-0 pb-1 md:relative md:-top-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.19em] text-lime-100 backdrop-blur-md sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_#c4f17a]" />
            Poli &amp; Pola · Plan personal
          </div>
          <h1 className="max-w-3xl text-[2.65rem] font-black leading-[.96] tracking-[-.065em] text-white sm:text-5xl lg:text-[4rem]">
            Un día a la vez.
            <span className="mt-1 block text-lime-300">Más fuerte cada semana.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-200/85 sm:text-base">
            Tu entrenamiento, ordenado y listo para seguir. Marcá cada ejercicio y llevá el ritmo a tu manera.
          </p>
          <a href="#entrenamiento" className="mt-6 inline-flex items-center gap-3 rounded-full bg-lime-300 px-5 py-3 text-sm font-bold text-[#12170d] transition hover:-translate-y-0.5 hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-200">
            Ver mi entrenamiento
            <span aria-hidden="true" className="text-lg leading-none">↓</span>
          </a>
        </div>

        <aside className="animate-rise hidden min-w-0 md:block" aria-label="Resumen de tu plan semanal">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111711]/65 p-4 shadow-[0_20px_65px_rgba(0,0,0,.28)] backdrop-blur-xl lg:p-4">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-lime-200/70">Tu plan semanal</p>
                <h2 className="mt-1 text-base font-bold tracking-tight text-white">{userData ? `Vamos, ${userData.name}` : "Hecho para moverte"}</h2>
              </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-lime-200/15 bg-lime-200/[.06] text-sm text-lime-100/80" aria-hidden="true">↗</span>
            </div>

            {userData ? (
              <>
                <div className="relative mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-white/[.07] bg-white/[.025] p-3">
                    <p className="text-xl font-bold tracking-tight text-white">{userData.rutina.length}</p>
                    <p className="mt-1 text-[8px] font-semibold uppercase tracking-[.16em] text-stone-400">Sesiones</p>
                  </div>
                  <div className="rounded-xl border border-white/[.07] bg-white/[.025] p-3">
                    <p className="text-xl font-bold tracking-tight text-white">{exerciseCount}</p>
                    <p className="mt-1 text-[8px] font-semibold uppercase tracking-[.16em] text-stone-400">Ejercicios</p>
                  </div>
                </div>
                <div className="relative mt-4 border-t border-white/[.08] pt-3">
                  <p className="mb-2.5 text-[8px] font-bold uppercase tracking-[.18em] text-stone-500">Tu semana</p>
                  <div className="flex flex-wrap gap-1.5">
                    {userData.rutina.slice(0, 5).map((session, index) => (
                      <span key={session.id} title={session.day} className="flex h-7 min-w-7 items-center justify-center rounded-lg border border-lime-200/10 bg-lime-200/[.05] px-1.5 text-[9px] font-bold text-lime-100/90">{String(index + 1).padStart(2, "0")}</span>
                    ))}
                    {userData.rutina.length > 5 && <span className="flex h-8 items-center px-1 text-[10px] text-stone-400">+{userData.rutina.length - 5}</span>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="relative mt-3 text-xs leading-5 text-stone-300">Dos planes personales, seguimiento por ejercicio y progreso guardado en tu dispositivo.</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {["Fuerza", "Constancia", "Progreso"].map((label) => <span key={label} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] font-medium text-stone-300">{label}</span>)}
                </div>
              </>
            )}
            <div className="relative mt-4 flex items-center gap-2 border-t border-white/[.08] pt-3 text-[9px] font-medium text-stone-500">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300/80" /> Seguimiento listo cuando vos quieras
            </div>
          </div>
          <p className="mt-3 pr-1 text-right text-[9px] font-semibold uppercase tracking-[.22em] text-white/50">Entrená a tu ritmo</p>
        </aside>
      </div>
    </section>
  );
}

export default function HomeClient() {
  const [userId, setUserId] = useState<UserId | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as UserId | null;
    if (stored && stored in routinesData) setUserId(stored);
    else setShowModal(true);

    const openProfilePicker = () => {
      setUserId(null);
      setShowModal(true);
    };
    window.addEventListener("rutina_change_profile", openProfilePicker);
    return () => window.removeEventListener("rutina_change_profile", openProfilePicker);
  }, []);

  const handleUserSelect = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setUserId(id as UserId);
    setShowModal(false);
    window.dispatchEvent(new Event("rutina_user_changed"));
  };

  const userData: UserRoutine | null = mounted && userId ? (routinesData[userId] as UserRoutine) : null;
  const exerciseCount = userData?.rutina.reduce((total, day) => total + day.groups.reduce((sum, group) => sum + group.exercises.length, 0), 0) ?? 0;

  return (
    <>
      {showModal && <UserModal onSelect={handleUserSelect} />}
      <HeroSection userData={userData} />

      <section id="entrenamiento" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12 lg:pb-28">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-lime-300/[.06] blur-3xl" />
        {userData && (
          <>
            <div className="relative mb-9 flex flex-col justify-between gap-6 border-b border-white/[.09] pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.24em] text-lime-200/80">
                  <span className="h-px w-6 bg-lime-300/70" /> Tu semana, en movimiento
                </p>
                <h2 className="text-3xl font-bold tracking-[-.045em] text-white sm:text-4xl">
                  Vamos, <span className="text-lime-300">{userData.name}.</span>
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-stone-400">Elegí el día, seguí la lista y marcá cada ejercicio a medida que avanzás.</p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="min-w-28 rounded-2xl border border-white/[.09] bg-white/[.035] px-4 py-3">
                  <p className="text-2xl font-bold tracking-tight text-white">{userData.rutina.length}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.15em] text-stone-500">Días</p>
                </div>
                <div className="min-w-28 rounded-2xl border border-white/[.09] bg-white/[.035] px-4 py-3">
                  <p className="text-2xl font-bold tracking-tight text-white">{exerciseCount}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.15em] text-stone-500">Ejercicios</p>
                </div>
              </div>
            </div>

            {userData.note && (
              <div className="relative mb-7 flex items-start gap-3 rounded-2xl border border-lime-200/15 bg-lime-200/[.06] p-4 sm:items-center sm:px-5">
                <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-200/10 text-lime-200">✳</span>
                <p className="text-sm leading-6 text-lime-100/90">{userData.note}</p>
              </div>
            )}

            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5">
              {userData.rutina.map((rutina, index) => (
                <RutinaCard key={rutina.id} day={rutina.day} groups={rutina.groups} dayId={rutina.id} userId={userId!} dayNumber={index + 1} />
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-stone-600">Tu progreso queda guardado en este dispositivo.</p>
          </>
        )}
        {!userData && mounted && !showModal && (
          <div className="rounded-3xl border border-white/[.08] bg-white/[.025] px-6 py-8 text-center">
            <p className="text-sm font-semibold text-stone-200">Elegí tu perfil para ver tu plan</p>
            <button onClick={() => setShowModal(true)} className="mt-4 rounded-full bg-lime-300 px-4 py-2 text-xs font-bold text-[#12170d] transition hover:bg-lime-200">Elegir perfil</button>
          </div>
        )}
      </section>
    </>
  );
}
