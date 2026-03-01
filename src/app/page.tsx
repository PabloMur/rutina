import RutinaCard from "@/components/RutinaCard";
import { rutinaCompleta } from "@/data/routines";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero con video */}
      <section className="relative w-full h-[55vh] overflow-hidden">
        <video
          src="/rocky.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/50 to-transparent flex items-end justify-center pb-10">
          <div className="text-center">
            <p className="text-lime-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2">
              Entrena como un campeón
            </p>
            <p className="text-white text-5xl font-black leading-none">
              4 DÍAS
            </p>
            <p className="text-gray-400 mt-2 text-sm">de entrenamiento semanal</p>
          </div>
        </div>
      </section>

      {/* Grid de rutinas */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rutinaCompleta.map((rutina) => (
            <RutinaCard key={rutina.id} day={rutina.day} steps={rutina.steps} />
          ))}
        </div>
      </section>
    </main>
  );
}
