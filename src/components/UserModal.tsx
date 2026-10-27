"use client";

interface Props {
  onSelect: (userId: string) => void;
}

const USERS = [
  { id: "pablo", label: "Poli", detail: "Tu plan de entrenamiento", initials: "P" },
  { id: "victoria", label: "Pola", detail: "Tu plan de entrenamiento", initials: "P" },
];

export default function UserModal({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="profile-title">
      <div className="animate-rise w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#111611] p-6 shadow-[0_30px_120px_rgba(0,0,0,.7)] sm:p-8">
        <div className="mb-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300 text-sm font-black text-[#10150b]">P&amp;P</div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.24em] text-lime-200/70">Tu espacio personal</p>
          <h2 id="profile-title" className="text-3xl font-bold tracking-[-.05em] text-white">¿Quién entrena hoy?</h2>
          <p className="mt-2 text-sm leading-6 text-stone-400">Elegí tu perfil para abrir tu plan y continuar donde lo dejaste.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {USERS.map(({ id, label, detail, initials }, index) => (
            <button key={id} onClick={() => onSelect(id)} className="group rounded-2xl border border-white/[.09] bg-white/[.025] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-lime-200/35 hover:bg-lime-200/[.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">
              <span className={`mb-7 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold transition ${index === 0 ? "bg-lime-200/15 text-lime-100 group-hover:bg-lime-200 group-hover:text-[#11170a]" : "bg-sky-200/10 text-sky-100 group-hover:bg-sky-200 group-hover:text-[#10151a]"}`}>
                {initials}
              </span>
              <span className="block text-lg font-bold text-white">{label}</span>
              <span className="mt-1 block text-xs text-stone-500">{detail}</span>
              <span aria-hidden="true" className="mt-4 block text-sm font-semibold text-lime-200 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">Entrar →</span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-[10px] leading-5 text-stone-600">Cada perfil conserva su propio progreso en este dispositivo.</p>
      </div>
    </div>
  );
}
