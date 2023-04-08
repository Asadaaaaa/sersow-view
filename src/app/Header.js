import Image from "next/image";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";

import font from "./font.module.css";
import LogoTitle from "../../public/images/Logo.svg";

export default function Header() {
  return (
    <div className="w-full bg-slate-900 px-24 py-9 border-b-[1px] border-b-solid border-b-slate-700 relative z-[2]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src={LogoTitle}
            className="w-72 pr-8 border-r-[1px] border-r-solid border-r-slate-700"
          />
          <Link href={"/home"} className="w-fit h-fit pl-8 transition ease-out delay-300 hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)] active:scale-[.92] active:delay-150">
            <h3 className={`${font.Satoshi_b2bold} text-slate-200 hover:shadow-2xl`}>
              Home
            </h3>
          </Link>
        </div>

        <div className="flex gap-5">
          <Link href={"/register"} className="flex items-center px-9 py-3  rounded-xl bg-gradient-to-b from-[#A855F7] to-[#7C3AED] transition ease-out delay-300 hover:to-[#A855F7] hover:shadow-[0_0_4px_1px_#A855F7] active:scale-[.92] active:delay-150 active:from-purple-600 active:to-purple-600">
            <div>
              <h4
                className={`${font.Satoshi_b2bold} text-left text-base font-bold text-white`}
              >
                Register
              </h4>
            </div>
          </Link>
          <div className="flex ">
            <Link href={"/log-in"}className="flex items-center gap-2 px-9 py-3 box-border	 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-200 hover:shadow-[0_0_4px_1px_white] hover:shadow-inner-[0_0_3px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150">
              <div >
                <FaSignInAlt className="text-white" />
              </div>
              <h4 className={`${font.Satoshi_b2bold} text-white`}>Log in</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
