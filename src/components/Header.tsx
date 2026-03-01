"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rutina_user";
const USER_NAMES: Record<string, string> = {
  pablo: "Pablo",
  victoria: "Victoria",
};

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

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  return (
    <header className="bg-gray-950 border-b border-lime-400/20 py-4 px-6 flex items-center justify-between">
      <div>
        <p className="text-lime-400 text-xs uppercase tracking-[0.3em] font-semibold">
          Pablo Murillo
        </p>
        <h1 className="font-black text-2xl text-white tracking-tight uppercase leading-tight">
          Tu Rutina
        </h1>
      </div>

      {userName && (
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Usuario
            </p>
            <p className="text-white font-bold text-sm">{userName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
