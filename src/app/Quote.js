import Image from "next/image";

import font from "./font.module.css";
import QuoteGradient from "../../public/images/Quote/QuoteGradient.svg";
import MarkZuckerberg from "../../public/images/Quote/MarkZuckerberg.png";

export default function Quote() {
  return (
    <div className="w-full bg-[radial-gradient(100%_342.58%_at_0%_0%,#0F172A_0%,#020617_100%)] flex flex-col xl:px-24 xl:py-24 lg:px-24 lg:py-24 md:px-24 md:py-24 sm:px-12 sm:py-20 ss:px-4 py-8 xl:gap-12 relative lg:gap-8 md:gap-6 sm:gap-4 ss:gap-3">
      <h1 className={`${font.Clash_display_h1medium} text-slate-400`}>a wise man once said</h1>
      <div className="flex flex-col xl:gap-6 lg:gap-5 md:gap-4 sm:gap-4 ss:gap-6">
        <div className="pb-3 bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text border-solid border-b-2 border-b-slate-600">
          <h3 className={`${font.Clash_display_d3medium} text-transparent`}>"People don't care about what you say, they care about what you build.</h3>
        </div>
        <div className="flex xl:gap-6 items-center lg:gap-4 md:gap-3 sm:gap-6 ss:gap-3">
          <Image src={MarkZuckerberg} alt="Mark Zuckerberg" className="xl:w-24 xl:h-24 lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-12 sm:h-12 ss:w-8 ss:h-8"/>
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