export default function CardContainer({ children }) {
  return (
    <div className="flex justify-between items-center w-[400px] h-24 p-6 gap-4 bg-slate-900 rounded-lg ">
      {children}
    </div>
  );
}