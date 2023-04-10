import font from "./font.module.css";

export default function Credits() {
  return (
    <div className="p-24 flex flex-col items-center gap-12">
      <h4 className={`${font.Clash_display_d4bold} text-white`}>Meet the masterminds</h4>
      <div className="px-2 py-1">
        <button className={`${font.Clash_display_h3bold} text-white px-8 py-4 bg-gradient-to-b from-cyan-400 to-sky-500 rounded-xl`}>Open Credits</button>
      </div>
    </div>
  );
}