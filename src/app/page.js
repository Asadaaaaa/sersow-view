import Image from "next/image";
import font from "./font.module.css";
import Link from "next/link";


import Header from "./Header";
import Footer from "./Footer";

import iconRight from "../../public/images/IconRight.svg";
import iconLeft from "../../public/images/IconLeft.svg";
import colorBlend from "../../public/images/blend.svg";
import { FaWrench } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <Header />

      <div className="flex flex-col content-center bg-gradient-to-b from-[#020617] to-[#0F172A] w-full ">
        <div>
          <Image src={colorBlend} className="absolute top-16 right-14 w-8/12 opacity-90 mix-blend-hard-light origin-top-right	"/>
          <Image src={iconRight} className="absolute right-0 opacity-50 -mr-40 mix-blend-soft-light"/>
          <Image src={iconLeft} className="absolute left-0 opacity-10 -ml-52 "/>
        </div>
        <div className="flex justify-center pt-32 z-[1]">
          <div className="">
            <FaWrench className="fill-white -rotate-90 " size="10rem" />
          </div>
          <div className="absolute translate-x-[45px]">
            <FaWrench className="fill-slate-50" size="3rem" />
          </div>
        </div>
        <div className="flex flex-col z-[1]">
          <div className="flex flex-row justify-center pt-12 ">
            <div className="items-center w-[55%]">
              <p
                className={`${font.Clash_display_h1medium} text-center text-stone-100 break-words`}
              >
                You've discovered a secret page that currently under construction
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center pb-8 pt-3">
            <div className="items-center">
              <p className={`${font.Clash_display_h5medium} text-slate-400`}>
                Achievement unlocked : Breach
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-28 pt-6 z-[1]">
          <Link href={"/home"} className="flex justify-center items-center w-60 h-16 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-100 hover:shadow-[0_0_5px_1px_white] hover:shadow-inner-[0_0_5px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150">
            <h4 className={`${font.Satoshi_h5bold} text-white`}>
              Respawn here
            </h4>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
