import Image from "next/image";

import font from "./font.module.css";

export default function Main() {
  return (
    <div className="relative">
      <Image src="/images/GalaxyBackground.png" width={1280} height={910} className="w-screen h-auto" />
      <div className="w-full h-full bg-Gradient1 absolute top-0 left-0 px-24">
        <div className="flex flex-col justify-end gap-24 py-20 h-[calc(100vh-103.39px)] translate-y-[103.39px]">
          <div>
            <h1 className={`${font.Clash_display_d4bold} text-white`}>Howdy Savvy!</h1>
            <p className={`${font.Clash_display_h5regular} text-white`}>Discover enormous projects at our showcase</p>
          </div>
          <button className="w-fit px-12 py-6 border-[1px] border-solid border-slate-300 rounded-xl">
            <h4 className={`${font.Clash_display_h5bold} text-white`}>DISCOVER</h4>
          </button>
        </div>
      </div>
    </div>
  );
}