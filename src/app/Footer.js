import Image from "next/image";
import Link from "next/link";

import font from "./font.module.css";
import LogoFooter from "../../public/images/LogoFooter.svg";

export default function Footer() {
  return (
    <div className="w-full bg-slate-900 px-24 py-6 border-t-[1px] border-t-solid border-t-slate-700 relative">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src={LogoFooter} className="w-64 " />
        </div>
        <div className="flex">
          <div className="flex gap-2 items-center">
            <Link href={"/credits"} className="flex items-center h-fit px-9 py-3 rounded-xl bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9] transition ease-out delay-300 hover:to-[#22D3EE] hover:shadow-[0_0_4px_1px_#22d3ee] active:scale-[.92] active:delay-150 active:from-cyan-500 active:to-cyan-500">
              <h4 className={`${font.Satoshi_b2bold} text-white`}>Credits</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
