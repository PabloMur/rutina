import RutinaCard from "@/components/RutinaCard";

const rutinaCompleta = [
  {
    day: "Día 1 - Pecho y Tríceps: Lunes",
    steps: [
      "Press de banca: 4 series x 8-10 repeticiones",
      "Fondos en paralelas: 3 series x 12 repeticiones",
      "Aperturas con mancuernas: 3 series x 12 repeticiones",
      "Press francés: 3 series x 10 repeticiones",
      "Fondos de tríceps en máquina: 3 series x 12 repeticiones",
    ],
  },
  {
    day: "Día 2 - Espalda y Bíceps: Miércoles / Jueves",
    steps: [
      "Dominadas o pull-ups: 4 series x 8-10 repeticiones",
      "Peso muerto: 4 series x 8-10 repeticiones",
      "Remo con barra T: 3 series x 12 repeticiones",
      "Curl de bíceps con barra: 3 series x 10 repeticiones",
      "Curl martillo con mancuernas: 3 series x 12 repeticiones",
    ],
  },
  {
    day: "Día 3 - Piernas y Hombros: Viernes / Sábado",
    steps: [
      "Sentadillas: 4 series x 10-12 repeticiones",
      "Prensa de piernas: 3 series x 12 repeticiones",
      "Extensiones de cuádriceps: 3 series x 12 repeticiones",
      "Press militar con barra: 4 series x 10 repeticiones",
      "Elevaciones laterales con mancuernas: 3 series x 12 repeticiones",
    ],
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-fit overflow-clip">
        <video
          src="../../../rocky.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
          className="m-auto"
        ></video>
      </div>
      <div className="m-auto">
        {rutinaCompleta.map((rutina, index) => (
          <RutinaCard key={index} day={rutina.day} steps={rutina.steps} />
        ))}
      </div>
    </main>
  );
}
