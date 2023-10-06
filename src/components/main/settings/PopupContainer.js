export default function PopupContainer({ children }) {
  return (
    <div className="flex flex-col gap-4 p-8 bg-slate-900 border-solid border-slate-700 border-[1px] rounded-xl">
      {children}
    </div>
  );
}