import Link from 'next/link';

import font from './font.module.css';

export default function Credits() {
  return (
    <div className="w-full bg-slate-950">
      <div id="credits" className="py-24 flex flex-col w-full items-center text-center gap-12">
        <h4 className={`${font.Clash_display_d4bold} text-white`}>Meet the masterminds</h4>
        <div className="px-2 py-1">
          <Link href="/credits">
            <button className={`${font.Clash_display_h3bold} text-white xl:px-8 xl:py-4 bg-gradient-to-b from-cyan-400 to-sky-500 rounded-xl ss:px-6 ss:py-3`}>Open Credits</button>
          </Link>
        </div>
      </div>
    </div>
  );
}