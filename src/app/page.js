import Image from "next/image";
import font from "./font.module.css";

import Header from "./component/Header";
import Footer from "./component/Footer";

import icon_1 from "../../public/images/Icon.svg";
import icon_2 from "../../public/images/Icon_2.svg";
import colorBlend from "../../public/images/blend.svg";
import { FaWrench } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <Header />

      <div className="flex flex-col content-center bg-gradient-to-b from-[#020617] to-[#0F172A] w-full ">
        <div>
          <Image src={colorBlend} className="absolute top-16 right-14 w-8/12 opacity-90 mix-blend-hard-light origin-top-right	"/>
          <Image src={icon_1} className="absolute right-0 opacity-50 -mr-40 mix-blend-soft-light"/>
          <Image src={icon_2} className="absolute left-0 opacity-10 -ml-52 "/>
        </div>
        {/* <Image src={icon_1} className="absolute object-left opacity-20" /> */}
        {/* <div className="absolute"> */}
        <div className="flex justify-center pt-32 z-[1]">
          <div className="">
            <FaWrench className="fill-[#22D3EE] -rotate-90 " size="10rem" />
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
                You've discoverd a secret page that currently under construction
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center py-8">
            <div className="items-center">
              <p className={`${font.Clash_display_h5medium} text-slate-400`}>
                Achievement unlocked : Breach
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-28 pt-6 z-[1]">
          <button className="flex justify-center items-center w-60 h-16 border-[1px] border-solid border-slate-300 rounded-xl respawn">
            <h4 className={`${font.Satoshi_h5bold} text-white`}>
              Respawn here
            </h4>
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
