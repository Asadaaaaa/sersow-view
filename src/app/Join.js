import Image from "next/image";

import font from "./font.module.css";
import UpiWhite from "../../public/images/UpiWhite.svg";

export default function Join() {
  return (
    <div className="bg-slate-900 px-24 py-12 flex flex-col items-center gap-12 border-solid border-y-[1px] border-y-slate-700">
      <Image src={UpiWhite} alt="UPI LOGO" className="w-48 h-48" />
      <div className="flex flex-col items-center gap-8">
        <div>
          <h1 className={`${font.Clash_display_h1medium} text-white`}>if you have upi.edu account</h1>
          <h6 className={`${font.Clash_display_h6medium} text-slate-400`}>Join now to gain access to publish project and interact with others</h6>
        </div>
        <div className="px-2 py-1">
          <button className={`${font.Clash_display_h3bold} text-white px-8 py-4 bg-gradient-to-b from-pink-500 to-violet-600 rounded-xl`}>Log In</button>
        </div>
      </div>
    </div>
  );
}