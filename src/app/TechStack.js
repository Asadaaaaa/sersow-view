import Image from "next/image";

import Tailwind from "../../public/images/TechStack/Tailwind.svg";
import Reactjs from "../../public/images/TechStack/Reactjs.svg";
import Nextjs from "../../public/images/TechStack/Nextjs.svg";
import Axios from "../../public/images/TechStack/Axios.svg";
import Expressjs from "../../public/images/TechStack/Expressjs.svg";
import Sequelize from "../../public/images/TechStack/Sequelize.svg";
import Mysql from "../../public/images/TechStack/Mysql.svg";
import font from "./font.module.css";

export default function TechStack({ styles }) {
  return (
    <div className="bg-[radial-gradient(100%_100%_at_50%_0%,#083344_0%,#020617_100%)] border-solid border-t-[1px] border-t-cyan-400 py-12 relative">
      <div className="absolute w-full flex justify-between top-0">
        <div className="w-60 h-[410px] bg-gradient-to-r from-slate-950 to-slate-950/0 -translate-y-[1px] ss:from-slate-950/30"></div>
        <div className="w-60 h-[410px] bg-gradient-to-l from-slate-950 to-slate-950/0 -translate-y-[1px] ss:from-slate-950/30"></div>
      </div>
      <div className="flex flex-col items-center xl:gap-12 lg:gap-10 md:gap-8 sm:gap-8 ss:gap-6">
        <div>
          <h4 className={`${font.Clash_display_d4medium} text-white text-center`}>One Platform</h4>
          <h4 className={`${font.Clash_display_h4medium} text-slate-400 text-center mt-1`}>Run with a tech stack</h4>
        </div>
        <div className={`overflow-x-hidden ${styles.techstackGallery}`}>
          <div className={`w-fit flex relative gap-20  ${styles.techstack}`}>
            <Image src={Tailwind} alt="Tailwind" />
            <Image src={Reactjs} alt="Reactjs" />
            <Image src={Nextjs} alt="Nextjs" />
            <Image src={Axios} alt="Axios" />
            <Image src={Expressjs} alt="Expressjs" />
            <Image src={Sequelize} alt="Sequelize" />
            <Image src={Mysql} alt="Mysql" />
            <Image src={Tailwind} alt="Tailwind" />
            <Image src={Reactjs} alt="Reactjs" />
            <Image src={Nextjs} alt="Nextjs" />
            <Image src={Axios} alt="Axios" />
            <Image src={Expressjs} alt="Expressjs" />
            <Image src={Sequelize} alt="Sequelize" />
            <Image src={Mysql} alt="Mysql" />
          </div>
        </div>
      </div>
    </div>
  );
}