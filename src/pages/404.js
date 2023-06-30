"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import '../app/globals.css';
import font from '../app/font.module.css';
import Header from '@/components/static/Header';
import Footer from '@/components/static/Footer';
import IconNol from '../../public/images/NotFound/NotFoundComponent1.svg';
import LGradient from '../../public/images/NotFound/NotFoundGradient1.svg';
import RGradient from '../../public/images/NotFound/NotFoundGradient2.svg';

export default function NotFound() {

  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[1];

  const [title, setTitle] = useState("Congrats! You just find an easter egg");
  const [description, setDescription] = useState("Nah, just kidding. You're lost within the mist.");

  useEffect(() => {
    if (path === "user-not-found") {
      setTitle("User not found");
      setDescription("User lost in the digital maze, chasing pixelated unicorns and elusive memes.");
    }
  }, [])

  return (
    <main>
      <Header />
      <div>
        <div className=" w-full bg-cover overflow-x-hidden bg-slate-950 flex  -mb-[130.91px] min-h-[860px] md:min-h-[960px] lg:min-h-[calc(100vh-220.3px)]">
          <div className="relative w-full mb-4">
            <Image src={RGradient} className="mix-blend-plus-lighter float-right z-[-2] w-56 md:w-[28rem] lg:w-auto" />
            <Image src={LGradient} className="mix-blend-hard-light float-left ss:mt-64 md:mt-72 lg:mt-24 z-[-1] w-56 md:w-[28rem] lg:w-auto" />
          </div>
          <div className="absolute w-full py-24 mt-2">
            <div className="flex flex-col gap-y-16 -gap-x-8 text-center justify-center items-center z-[3]">
              <h1 className={`${font.Clash_display_d1bold} text-white flex items-center text-center`}><span className='text-cyan-500 absolute -translate-x-16 md:-translate-x-16'>4</span> <Image src={IconNol} className="w-44 md:w-full translate-x-4 md:translate-x-4"/> <span className=' absolute translate-x-32 md:translate-x-44'>4</span></h1>
              <div className="flex flex-col gap-4 item-center relative z-[3]">
                <h2 className={`${font.Clash_display_h1medium} text-center text-white`}>{title}</h2>
                <p className={`${font.Clash_display_h5medium} text-center text-gray-500`}>{description}</p>
              </div>
              <button 
                className="respawnBtn flex items-center gap-8 px-8 py-4 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-150 hover:shadow-[0_0_4px_1px_white] hover:shadow-inner-[0_0_3px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150"
                onClick={() => {
                  router.back();
                  if (path === "user-not-found") {
                    router.back();
                  }
                }}
              >
                <h5 className={`${font.Clash_display_h5medium} text-white`}>Respawn here</h5>
              </button>
            </div>
          </div>  
        </div>
        <Footer transparent={true} />
      </div>
    </main>
  );
}
