import Image from "next/image";
import font from "./font.module.css";

import Header from "./component/Header";
import Footer from "./component/Footer";

import icon_1 from "../../public/images/Icon.svg";
import { FaWrench } from "react-icons/fa";


export default function Home() {
  return (
    <main>
      <Header />
      
      <div className="flex-col content-center bg-gradient-to-b from-[#020617] to-[#0F172A] w-screen h-full">
        
        <div className="flex relative  justify-center pt-32">
          <div className="">
            <FaWrench className="fill-[#22D3EE] -rotate-90 " size="10rem" />
          </div>
          <div className="absolute translate-x-[45px]">
            <FaWrench className="fill-slate-50" size="3rem" />
          </div>
        </div>
        <div className="flex flex-col">
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

        <div className="flex justify-center pb-28 pt-6">
          <button className="flex justify-center items-center w-60 h-16 border-[1px] border-solid border-slate-300 rounded-xl">
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
