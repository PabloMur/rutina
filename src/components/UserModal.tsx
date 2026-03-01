"use client";

interface Props {
  onSelect: (userId: string) => void;
}

const USERS = [
  { id: "pablo", label: "Poli" },
  { id: "victoria", label: "Pola" },
];

export default function UserModal({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-xs shadow-2xl">
        <div className="text-center mb-8">
          <p className="text-lime-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2">
            Bienvenido
          </p>
          <h2 className="text-white font-black text-3xl">¿Quién sos?</h2>
          <p className="text-gray-400 text-sm mt-2">
            Elegí tu usuario para ver tu rutina
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {USERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="group bg-gray-800 hover:bg-lime-400 text-white hover:text-gray-950 border border-gray-700 hover:border-lime-400 rounded-2xl px-6 py-5 font-bold text-xl transition-all duration-200 text-left flex items-center gap-4"
            >
              <span className="w-10 h-10 rounded-full bg-gray-700 group-hover:bg-gray-950/20 flex items-center justify-center text-lime-400 group-hover:text-gray-950 font-black text-lg transition-colors duration-200">
                {label[0]}
              </span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
