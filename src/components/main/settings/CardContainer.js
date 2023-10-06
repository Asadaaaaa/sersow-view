export default function CardContainer({ children }) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-900 rounded-lg">
      {children}
    </div>
  );
}