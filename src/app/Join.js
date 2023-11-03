import Link from "next/link";
import Image from "next/image";

import font from "./font.module.css";
import UpiWhite from "../../public/images/Join/UpiWhite.svg";

export default function Join() {
  return (
    <div className="bg-slate-900 xl:py-12 flex flex-col items-center gap-12 border-solid border-y-[1px] border-y-slate-700 lg:py-8 md:py-8 sm:py-10 ss:py-8">
      <Image src={UpiWhite} alt="UPI LOGO" className="xl:w-48 xl:h-48 lg:w-40 lg:h-40 md:w-36 md:h-36 sm:w-40 sm:h-40 ss:w-32 ss:h-32" />
      <div className="flex flex-col w-full items-center text-center gap-8">
        <div>
          <h1 className={`${font.Clash_display_h1medium} text-white`}>if you have upi.edu account</h1>
          <h6 className={`${font.Clash_display_h6medium} text-slate-400`}>Join now to gain access to publish project and interact with others</h6>
        </div>
        <div className="px-2 py-1">
          <Link href="login">
            <button className={`${font.Clash_display_h3bold} text-white xl:px-8 xl:py-4 bg-gradient-to-b from-pink-500 to-violet-600 rounded-xl lg:px-6 lg:py-3 ss:px-4 ss:py-2 `}>Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}