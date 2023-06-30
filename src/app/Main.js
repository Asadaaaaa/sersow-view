import Link from "next/link";
import Image from "next/image";

import font from "./font.module.css";

export default function Main() {
  return (
    <div className="relative w-full" id="main">
      <Image src="/images/GalaxyBackground.png" width={1280} height={910} className="object-left xl:w-screen xl:h-auto xl:object-contain lg:w-screen lg:h-auto lg:object-contain md:w-screen md:h-auto md:object-contain sm:w-auto sm:h-[720px] sm:object-cover ss:w-auto ss:h-[640px] ss:object-cover" />
      <div className="w-full h-full bg-Gradient1 absolute top-0">
        <div className="flex flex-col h-full w-full xl:items-start lg:items-start md:items-start xl:text-start lg:text-start md:text-start justify-end absolute xl:gap-24 xl:py-20 xl:-top-[48vh] xl:left-24 xl:translate-x-0 lg:gap-20 lg:py-16 lg:-top-[24vh] lg:left-20 lg:translate-x-0 md:gap-10 md:py-12 md:-top-[24vh] md:left-16 md:translate-x-0 sm:gap-12 sm:py-10 sm:-top-[28vh] sm:left-[50%] sm:translate-x-[-50%] sm:items-center sm:text-center ss:gap-8 ss:py-10 ss:-top-[28vh] ss:left-[50%] ss:translate-x-[-50%] ss:items-center ss:text-center">
          <div>
            <h1 className={`${font.Clash_display_d4bold} text-white`}>Howdy Savvy!</h1>
            <p className={`${font.Clash_display_h5regular} text-white`}>Discover enormous projects at our showcase</p>
          </div>
          <Link href="/discover">
            <button className="w-fit xl:px-12 xl:py-6 border-[1px] border-solid border-slate-300 rounded-xl lg:px-10 lg:py-6 md:px-8 md:py-4 sm:px-6 sm:py-3 ss:px-7 ss:py-3"> 
              <h4 className={`${font.Clash_display_h5bold} text-white`}>DISCOVER</h4>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}