"use client";

import { useEffect, useState } from "react";
import type { DayRoutine } from "@/types/rutina";

type Props = Pick<DayRoutine, "day" | "groups"> & {
  dayId: string;
  userId: string;
  dayNumber: number;
};

export default function RutinaCard({ day, groups, dayId, userId, dayNumber }: Props) {
  const storageKey = `rutina_checks_${userId}_${dayId}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const total = groups.reduce((sum, group) => sum + group.exercises.length, 0);
  const done = checked.size;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done === total;

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(stored)) {
        const exercises = new Set(groups.flatMap((group) => group.exercises));
        setChecked(new Set(stored.filter((item): item is string => typeof item === "string" && exercises.has(item))));
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
    setMounted(true);
  }, [groups, storageKey]);

  const toggle = (exercise: string) => {
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(exercise)) next.delete(exercise);
      else next.add(exercise);
      localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const reset = () => {
    setChecked(new Set());
    localStorage.removeItem(storageKey);
  };

  return (
    <article className={`group/card overflow-hidden rounded-[1.65rem] border bg-[#111611] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,.28)] ${allDone && mounted ? "border-lime-200/35" : "border-white/[.08] hover:border-lime-200/20"}`}>
      <div className="border-b border-white/[.07] bg-white/[.018] px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-lime-200/70">Sesión {String(dayNumber).padStart(2, "0")}</p>
            <h3 className="text-lg font-bold leading-snug tracking-[-.025em] text-stone-100 sm:text-xl">{day}</h3>
          </div>
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-xs font-bold tabular-nums transition ${allDone && mounted ? "border-lime-200/30 bg-lime-200/15 text-lime-100" : "border-white/[.08] bg-white/[.04] text-stone-300"}`}>
            {mounted ? `${done}/${total}` : String(total).padStart(2, "0")}
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[.08]" role="progressbar" aria-label={`Progreso de sesión ${dayNumber}`} aria-valuemin={0} aria-valuemax={total} aria-valuenow={mounted ? done : 0}>
            <div className="h-full rounded-full bg-lime-300 transition-[width] duration-500 ease-out" style={{ width: `${mounted ? progress : 0}%` }} />
          </div>
          <span className="w-9 text-right text-[10px] font-semibold tabular-nums text-stone-500">{mounted ? `${progress}%` : "—"}</span>
          {mounted && done > 0 && (
            <button onClick={reset} aria-label={`Reiniciar progreso de sesión ${dayNumber}`} title="Reiniciar progreso" className="flex h-7 w-7 items-center justify-center rounded-full text-base text-stone-500 transition hover:bg-white/[.07] hover:text-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-200">
              ↺
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5 px-4 py-5 sm:px-5">
        {groups.map((group, groupIndex) => (
          <div key={group.name ?? groupIndex}>
            {group.name && <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[.2em] text-stone-500">{group.name}</p>}
            <ul className="space-y-1">
              {group.exercises.map((exercise, exerciseIndex) => {
                const isChecked = mounted && checked.has(exercise);
                return (
                  <li key={`${groupIndex}-${exerciseIndex}`}>
                    <button type="button" onClick={() => toggle(exercise)} aria-pressed={isChecked} className="group flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-white/[.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-lime-200">
                      <span aria-hidden="true" className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition ${isChecked ? "border-lime-300 bg-lime-300 text-[#10150b]" : "border-white/15 bg-white/[.035] text-stone-500 group-hover:border-lime-200/50 group-hover:text-lime-100"}`}>
                        {isChecked ? "✓" : exerciseIndex + 1}
                      </span>
                      <span className={`text-[13px] leading-5 transition sm:text-sm ${isChecked ? "text-stone-600 line-through" : "text-stone-300 group-hover:text-white"}`}>{exercise}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {allDone && mounted && <div className="border-t border-lime-200/10 bg-lime-200/[.045] px-6 py-3 text-xs font-semibold text-lime-100">Sesión completada. Buen trabajo.</div>}
    </article>
  );
}
