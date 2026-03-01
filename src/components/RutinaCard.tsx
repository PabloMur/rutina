import { Rutina } from "@/types/rutina";

type Props = Pick<Rutina, "day" | "steps">;

export default function RutinaCard({ day, steps }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-colors duration-300">
      <div className="bg-gray-950 px-6 py-4 border-b border-gray-700">
        <h3 className="text-lime-400 font-bold text-lg uppercase tracking-wide text-center">
          {day}
        </h3>
      </div>
      <ul className="p-5 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-lime-400 text-gray-950 rounded-full flex items-center justify-center text-xs font-black mt-0.5">
              {index + 1}
            </span>
            <span className="text-gray-200 text-sm leading-relaxed">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
