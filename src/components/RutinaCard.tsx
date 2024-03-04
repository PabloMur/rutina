export default function RutinaCard({ day, steps }: any) {
  return (
    <div className="w-full p-4">
      <h3 className="text-lime-400 border border-lime-400 w-fit p-4 text-2xl font bold uppercase rounded-2xl">
        {day}
      </h3>
      <ul className="p-2 text-xl">
        {steps.map((step: string, index: number) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
