"use client";

import { useEffect, useState } from "react";
import type { DayRoutine } from "@/types/rutina";

type Props = Pick<DayRoutine, "day" | "groups"> & {
  dayId: string;
  userId: string;
};

export default function RutinaCard({ day, groups, dayId, userId }: Props) {
  const storageKey = `rutina_checks_${userId}_${dayId}`;

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  const total = groups.reduce((sum, g) => sum + g.exercises.length, 0);
  const done = checked.size;
  const allDone = done === total;

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setChecked(new Set(JSON.parse(stored) as string[]));
    }
  }, [storageKey]);

  const toggle = (exercise: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(exercise)) {
        next.delete(exercise);
      } else {
        next.add(exercise);
      }
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChecked(new Set());
    localStorage.removeItem(storageKey);
  };

  return (
    <div
      className={`bg-gray-900 border rounded-2xl overflow-hidden transition-colors duration-300 ${
        allDone && mounted
          ? "border-lime-400/60"
          : "border-gray-700 hover:border-lime-400/30"
      }`}
    >
      {/* Header */}
      <div className="bg-gray-950 px-6 py-4 border-b border-gray-700">
        <h3 className="text-lime-400 font-bold text-lg uppercase tracking-wide text-center">
          {day}
        </h3>

        {/* Progress bar */}
        {mounted && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-lime-400 rounded-full transition-all duration-500"
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 font-medium tabular-nums">
              {done}/{total}
            </span>
            {done > 0 && (
              <button
                onClick={reset}
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors duration-150"
                title="Resetear"
              >
                ↺
              </button>
            )}
          </div>
        )}
      </div>

      {/* Exercises */}
      <div className="p-5 space-y-5">
        {groups.map((group, gi) => (
          <div key={group.name ?? gi}>
            {group.name && (
              <p className="text-lime-400/60 text-xs font-bold uppercase tracking-widest mb-2">
                {group.name}
              </p>
            )}
            <ul className="space-y-1.5">
              {group.exercises.map((exercise, i) => {
                const isChecked = mounted && checked.has(exercise);
                return (
                  <li
                    key={exercise}
                    onClick={() => toggle(exercise)}
                    className="flex items-start gap-3 cursor-pointer group select-none rounded-xl px-2 py-1.5 hover:bg-white/5 transition-colors duration-150"
                  >
                    {/* Check button */}
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mt-0.5 transition-all duration-200 ${
                        isChecked
                          ? "bg-lime-400 text-gray-950"
                          : "bg-gray-800 text-gray-500 border border-gray-600 group-hover:border-lime-400/50 group-hover:text-lime-400"
                      }`}
                    >
                      {isChecked ? "✓" : i + 1}
                    </span>

                    {/* Exercise text */}
                    <span
                      className={`text-sm leading-relaxed transition-all duration-200 ${
                        isChecked
                          ? "line-through text-gray-600"
                          : "text-gray-200 group-hover:text-white"
                      }`}
                    >
                      {exercise}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
