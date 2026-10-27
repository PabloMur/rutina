"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rutina_user";
const USER_NAMES: Record<string, string> = { pablo: "Poli", victoria: "Pola" };

export default function Header() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      setUserName(stored ? (USER_NAMES[stored] ?? null) : null);
    };
    update();
    window.addEventListener("rutina_user_changed", update);
    return () => window.removeEventListener("rutina_user_changed", update);
  }, []);

  const handleChangeProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("rutina_change_profile"));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[.08] bg-[#0a0d0a]/85 px-5 py-2.5 backdrop-blur-xl sm:px-8 sm:py-3 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#inicio" aria-label="Tu Rutina, inicio" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-xs font-black tracking-tighter text-[#10150b] shadow-[0_0_28px_rgba(190,242,100,.16)] transition-transform group-hover:rotate-[-6deg] sm:h-10 sm:w-10 sm:rounded-2xl sm:text-sm">
            P<span className="text-[#536c28]">&amp;</span>P
          </span>
          <span className="min-w-0">
            <span className="block whitespace-nowrap text-[13px] font-bold tracking-tight text-white sm:text-sm">Tu Rutina</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[.18em] text-stone-500 sm:block">Entrenamiento personal</span>
          </span>
        </a>

        {userName ? (
          <button
            onClick={handleChangeProfile}
            aria-label={`Cambiar perfil. Perfil actual: ${userName}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[.035] py-1 pl-1 pr-2.5 text-xs font-semibold text-stone-300 transition hover:border-lime-200/35 hover:bg-lime-200/[.06] hover:text-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200 sm:gap-2.5 sm:py-1.5 sm:pl-1.5 sm:pr-3.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-300/15 text-[11px] font-bold text-lime-200 sm:h-8 sm:w-8 sm:text-xs">
                {userName[0]}
            </span>
            <span className="sm:hidden">{userName}</span>
            <span className="hidden sm:inline">Cambiar perfil</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 text-stone-500 sm:ml-1">
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        ) : (
          <span className="hidden rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-stone-500 sm:inline-flex">Tu espacio de entrenamiento</span>
        )}
      </div>
    </header>
  );
}
