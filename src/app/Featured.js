// 'use client';

import Image from "next/image";

import { featured } from "./dummy";
import font from "./font.module.css";

export default function Featured() {
  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col gap-24 relative">
      <div className="px-24">
        <Image src="/images/FeaturedTitle.png" width={1250} height={88} className="w-full" />
      </div>
      <div className="overflow-x-auto featured-gallery">
        <div className="flex w-fit gap-8 px-24">
          {
            featured.map((element, index) => (
              <div className="flex gap-8" key={index}>
                <div className="relative w-[600px] h-[400px]">
                  <Image src={element.thumbnail} alt="thumbnail" className="w-full h-full rounded-xl" />
                  <div className="absolute top-0 w-full h-full bg-slate-950/50 rounded-xl flex justify-center items-center">
                    <Image src={element.logo} alt="logo" className="w-[140px]" />
                  </div>
                </div>
                {
                  index != featured.length - 1 ? (
                    <div className="w-60 h-[400px] bg-gradient-to-br from-slate-800/20 to-slate-900/20 border-solid border-[1px] border-slate-700 rounded-xl"></div>
                  ) : (
                    <></>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}