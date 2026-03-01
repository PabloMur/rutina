export default function Header() {
  return (
    <header className="bg-gray-950 border-b border-lime-400/20 py-5 px-6 flex flex-col items-center gap-1">
      <span className="text-lime-400 text-xs uppercase tracking-[0.3em] font-semibold">
        Pablo Murillo
      </span>
      <h1 className="font-black text-3xl text-white tracking-tight uppercase">
        Tu Rutina
      </h1>
      <p className="text-gray-400 text-sm">Plan de entrenamiento semanal · 4 días</p>
    </header>
  );
}
