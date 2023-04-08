import Image from "next/image";
import Link from "next/link";

import font from "./font.module.css";
import LogoFooter from "../../public/images/LogoFooter.svg";

export default function Footer() {
  return (
    <div className="w-full bg-slate-900/20 px-24 py-6 border-t-[1px] border-t-solid border-t-slate-700 relative z-[2]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src={LogoFooter} className="w-64 " />
        </div>
        <div className="flex">
          <div className="flex gap-2 items-center">
            <Link href="#" id="credit" className="flex items-center h-fit px-9 py-3  border-solid rounded-xl bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9] transition ease-out delay-100 hover:to-[#22D3EE] hover:shadow-[0px_0px_12px_.5px_#22d3ee] active:shadow-[0_0_0_0] active:scale-[.92] active:from-[rgb(6 182 212)] active:to-[rgb(6 182 212)] active:delay-150">
              <h4 className={`${font.Satoshi_b2bold} text-white`}>Credits</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}