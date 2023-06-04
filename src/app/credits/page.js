import Image from "next/image";

import font from "../font.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import BgGradient from "../../../public/images/Credit/CreditGradient1.svg";
import Azka from "../../../public/images/Credit/zka.svg";
import Mikey from "../../../public/images/Credit/zka.svg";
import Adit from "../../../public/images/Credit/zka.svg";
import Lele from "../../../public/images/Credit/zka.svg";
import Fza from "../../../public/images/Credit/zka.svg";
import Talim from "../../../public/images/Credit/zka.svg";
import Afwa from "../../../public/images/Credit/zka.svg";
import Rafi from "../../../public/images/Credit/zka.svg";

export default function Credits() {
  
  const dataDev = [
    [
      {
      image: Adit,
      color: "pink-950",
      url: "",
      jobdesk: "Tech Design",
      nama: "Aditya Speed"
      },
      {
      image: Mikey,
      color: "[#450a0a]",
      url: "https://github.com/Asadaaaaa",
      jobdesk: "Tech Lead",
      nama: "Mikail Asada"
      },
      {
      image: Azka,
      color: "[#2E1065]",
      url: "https://github.com/zkazharan",
      jobdesk: "Tech Manager",
      nama: "Azka Ahmad"
      }],
    [
      {
        image: Lele,
        color: "[#1A2E05]",
        url: "https://github.com/dylee33",
        jobdesk: "Front-end",
        nama: "Innaka Dylee"
      },
      {
        image: Fza,
        color: "fuchsia-950",
        url: "",
        jobdesk: "UI/UX & Front-end",
        nama: "Hanisah Fildza"
      },
      {
        image: Talim,
        color: "sky-900",
        url: "",
        jobdesk: "Front-end & Back-end",
        nama: "Muhamad Talim"
      },
      {
        image: Afwa,
        color: "blue-950",
        url: "",
        jobdesk: "Database Designer & Back-end",
        nama: "Afwa Afini"
      },
      {
        image: Rafi,
        color: "orange-950",
        url: "",
        jobdesk: "Front-end",
        nama: "Rafi Fajrul"
      }]
  ]

  return (
    <main>
      <Header/>
      <div className="flex flex-col content-center text-white bg-slate-950 w-full min-h-[calc(100vh-220.3px)] py-8">
        <div>
          <Image src={BgGradient} className="absolute float-right right-0 mix-blend-hard-light w-3/6 -mt-8"/>
        </div>
        <p className={`${font.Clash_display_h1bold} mx-auto mt-20 mb-16 pb-4`}>Meet our savvy mastermind</p>
        {dataDev.map((row) => (
          <div className="mx-auto flex gap-6 mb-12">
          {row.map((items) => (
              <div className="group">
                <div className="relative w-48 rounded-[0.65rem] overflow-hidden text-white">
                  <Image src={items.image} className="absolute object-cover transition-transform duration-[1800ms] transform group-hover:scale-110"/>
                  <div className={`w-48 h-48 inset-0 bg-gradient-to-t from-${items.color} to-transparent to-50% opacity-[99%] hover:to-75% transition-all duration-[1800ms]`}>
                    <div className="w-48 h-48 inset-0 bg-gradient-to-r from-slate-950 to-[#00000000] to-50% opacity-[99%]">
                      <a href={items.url} className="absolute left-[3.25rem] w-fit h-fit rounded-2xl px-2 py-1 border-[1px] opacity-0 group-hover:translate-y-36 group-hover:opacity-100 transition-all duration-[1800ms]" >Visit Profil</a>
                      <p className={`${font.Satoshi_c3medium} absolute  bottom-9 left-2 group-hover:-translate-y-24 transition-transform duration-[1800ms]`}>{items.jobdesk}</p>
                      <p className={`${font.Clash_display_h6medium} absolute  bottom-4 left-2 group-hover:-translate-y-32 transition-transform duration-[1800ms]`}>{items.nama}</p>
                    </div>
                  </div>
                </div>
              </div>
          ))}
            </div>
        ))}
        <br/>    
      </div>
      <Footer/>
    </main>
  );
}