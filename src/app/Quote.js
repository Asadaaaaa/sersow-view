import Image from "next/image";

import font from "./font.module.css";
import QuoteGradient from "../../public/images/Quote/QuoteGradient.svg";
import MarkZuckerberg from "../../public/images/Quote/MarkZuckerberg.png";

export default function Quote() {
  return (
    <div className="bg-[radial-gradient(100%_342.58%_at_0%_0%,#0F172A_0%,#020617_100%)] flex flex-col gap-12 p-24 relative">
      <h1 className={`${font.Clash_display_h1medium} text-slate-400`}>a wise man once said</h1>
      <div className="flex flex-col gap-6">
        <div className="pb-3 bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text border-solid border-b-2 border-b-slate-600">
          <h3 className={`${font.Clash_display_d3medium} text-transparent`}>"People don't care about what you say, they care about what you build.</h3>
        </div>
        <div className="flex gap-6 items-center">
          <Image src={MarkZuckerberg} alt="Mark Zuckerberg" className="w-24 h-24" />
          <div>
            <h3 className={`${font.Clash_display_h3bold} text-white`}>Mark Zuckerberg</h3>
            <h4 className={`${font.Clash_display_h4medium} text-slate-400`}>CEO of Meta</h4>
          </div>
        </div>
      </div>
      <Image src={QuoteGradient} alt="gradient" className="w-full absolute left-0 bottom-0" />
    </div>
  );
}