import Image from "next/image";

import font from "../font.module.css";
import LogoFooter from "../../../public/images/LogoFooter.svg";

export default function Footer() {
  return (
    <div className="w-full bg-slate-950/20 px-24 py-6 border-t-[1px] border-t-solid border-t-slate-700 relative z-[2]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src={LogoFooter} className="w-64 " />
        </div>
        <div className="flex">
          <div className="flex gap-2 items-center">
            <button className="flex items-center h-fit px-9 py-3 border-[1px] border-solid border-slate-300 rounded-xl bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9]">
              <h4 className={`${font.Satoshi_b2bold} text-white`}>Credit</h4>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}