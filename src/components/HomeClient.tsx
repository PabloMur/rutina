"use client";

import { useEffect, useState } from "react";
import UserModal from "./UserModal";
import RutinaCard from "./RutinaCard";
import routinesData from "@/data/routines.json";
import type { UserId, UserRoutine } from "@/types/rutina";

const STORAGE_KEY = "rutina_user";

export default function HomeClient() {
  const [userId, setUserId] = useState<UserId | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as UserId | null;
    if (stored && stored in routinesData) {
      setUserId(stored);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleUserSelect = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setUserId(id as UserId);
    setShowModal(false);
    // Notify Header to update
    window.dispatchEvent(new Event("rutina_user_changed"));
  };

  // Avoid hydration mismatch
  if (!mounted) return null;

  const userData: UserRoutine | null = userId
    ? (routinesData[userId] as UserRoutine)
    : null;

  return (
    <>
      {showModal && <UserModal onSelect={handleUserSelect} />}

      {userData && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          {userData.note && (
            <div className="mb-8 bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 text-center">
              <p className="text-lime-400 text-sm font-medium">{userData.note}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {userData.rutina.map((rutina) => (
              <RutinaCard
                key={rutina.id}
                day={rutina.day}
                groups={rutina.groups}
                dayId={rutina.id}
                userId={userId!}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
