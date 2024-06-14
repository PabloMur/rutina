import RutinaCard from "@/components/RutinaCard";

const rutinaCompleta = [
  {
    day: "Día 1 - Pecho y Tríceps: Lunes",
    steps: [
      "Press de banca: 4 series x 6-8 repeticiones",
      "Press inclinado con mancuernas: 3 series x 8-10 repeticiones",
      "Fondos en paralelas: 3 series x 10-12 repeticiones",
      "Aperturas con mancuernas en banco inclinado: 3 series x 10-12 repeticiones",
      "Press francés: 4 series x 8-10 repeticiones",
      "Extensiones de tríceps con cuerda: 3 series x 12-15 repeticiones",
    ],
  },
  {
    day: "Día 2 - Espalda y Bíceps: Martes",
    steps: [
      "Dominadas lastradas o pull-ups: 4 series x 6-8 repeticiones",
      "Peso muerto: 4 series x 6-8 repeticiones",
      "Remo con barra: 4 series x 8-10 repeticiones",
      "Jalón al pecho: 3 series x 10-12 repeticiones",
      "Curl de bíceps con barra: 4 series x 8-10 repeticiones",
      "Curl martillo con mancuernas: 3 series x 10-12 repeticiones",
    ],
  },
  {
    day: "Día 3 - Piernas y Hombros: Jueves",
    steps: [
      "Sentadillas: 4 series x 8-10 repeticiones",
      "Peso muerto rumano: 4 series x 8-10 repeticiones",
      "Prensa de piernas: 4 series x 10-12 repeticiones",
      "Extensiones de cuádriceps: 3 series x 12-15 repeticiones",
      "Press militar con barra: 4 series x 8-10 repeticiones",
      "Elevaciones laterales con mancuernas: 3 series x 12-15 repeticiones",
      "Elevaciones frontales con mancuernas: 3 series x 12-15 repeticiones",
    ],
  },
  {
    day: "Día 4 - Espalda y Trapecios: Viernes",
    steps: [
      "Peso muerto convencional: 4 series x 6-8 repeticiones",
      "Remo con barra T: 4 series x 8-10 repeticiones",
      "Jalón al pecho: 3 series x 10-12 repeticiones",
      "Encogimientos con mancuernas: 4 series x 10-12 repeticiones",
      "Face pulls: 3 series x 12-15 repeticiones",
    ],
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
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
