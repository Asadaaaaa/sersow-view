import Link from "next/link";
import Image from "next/image";
import font from "../font.module.css";
import { FaWrench } from "react-icons/fa";

import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import colorBlendRight from "../../../public/images/ComingSoon/ComingSoonGradient1.svg";
import colorBlendLeft from "../../../public/images/ComingSoon/ComingSoonGradient2.svg";
import iconLeft from "../../../public/images/ComingSoon/ComingSoonComponent1.svg";
import iconRight from "../../../public/images/ComingSoon/ComingSoonComponent2.svg";

export default function Home() {
  return (
    <main className="overflow-y-hidden">
      <Header />
      <div className=" bg-gradient-to-b from-[#020617] to-[#0F172A] w-full  ">
        <div className=" relative w-full pt-24 min-h-[calc(100vh-220.3px)]">
          <Image
            src={colorBlendRight}
            className="absolute mix-blend-hard-light -top-[115px] right-0"
          />
          <Image
            src={colorBlendLeft}
            className="absolute mix-blend-hard-light -bottom-[122px] -left-[210px]"
          />
          <Image
            src={iconRight}
            className="absolute opacity-40 mix-blend-soft-light right-0 top-[10%]"
          />
          <Image
            src={iconLeft}
            className="absolute opacity-10 left-0 top-[10%]"
          />

          <div className="flex flex-col items-center z-[2]">
            <div className="flex justify-center pt-32 ">
              <div className="">
                <FaWrench className="fill-white -rotate-90 " size="10rem" />
              </div>
              <div className="absolute translate-x-[45px]">
                <FaWrench className="fill-slate-50" size="3rem" />
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row justify-center pt-12 ">
                <div className="items-center w-[55%]">
                  <p
                    className={`${font.Clash_display_h1medium} text-center text-stone-100 break-words`}
                  >
                    You've discovered a secret page that currently under
                    construction
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-center pb-8 pt-3">
                <div className="items-center">
                  <p
                    className={`${font.Clash_display_h5medium} text-slate-400`}
                  >
                    Achievement unlocked : Breach
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-28 pt-6">
              <Link
                href={"/home"}
                className="flex justify-center items-center w-60 h-16 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-100 hover:shadow-[0_0_5px_1px_white] hover:shadow-inner-[0_0_5px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150"
              >
                <h4 className={`${font.Satoshi_h5bold} text-white`}>
                  Respawn here
                </h4>
              </Link>
            </div>
          </div>
        </div>
        <Footer transparent={true} />
      </div>
    </main>
  );
}
