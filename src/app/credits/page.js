import Image from 'next/image';

import font from '../font.module.css';
import Header from '@/components/static/Header';
import Footer from '@/components/static/Footer';
import Fza from '../../../public/images/Credit/fza.jpeg';
import Afwa from '../../../public/images/Credit/fwa.jpeg';
import Azka from '../../../public/images/Credit/zka.jpeg';
import Adit from '../../../public/images/Credit/dit.jpeg';
import Lele from '../../../public/images/Credit/lee.jpeg';
import Mikey from '../../../public/images/Credit/mik.jpeg';
import Rafi from '../../../public/images/Credit/jefri.jpeg';
import Talim from '../../../public/images/Credit/tlim.jpeg';
import BgGradient from '../../../public/images/Credit/CreditGradient1.svg';

export default function Credits() {
  
  const dataDev = [
    [
      {
        image: Azka,
        color: "rgb(46, 16, 101)",
        url: "https://stg.sersow.otech.id/profile/zka",
        jobdesk: "Tech Manager",
        nama: "Azka Ahmad"
      },
      {
        image: Mikey,
        color: "rgb(69, 10, 10)",
        url: "https://stg.sersow.otech.id/profile/asada",
        jobdesk: "Tech Lead",
        nama: "Mikail Asada"
      },
      {
        image: Adit,
        color: "rgb(80, 7, 36)",
        url: "https://stg.sersow.otech.id/profile/dit_aspd",
        jobdesk: "Tech Design",
        nama: "Aditya Syawal"
      }
    ],
    [
      {
        image: Lele,
        color: "rgb(26 46 5)",
        url: "./#",
        jobdesk: "Front-end",
        nama: "Innaka Dylee"
      },
      {
        image: Fza,
        color: "rgb(74 4 78)",
        url: "./#",
        jobdesk: "UI/UX & Front-end",
        nama: "Hanisah Fildza"
      },
      {
        image: Talim,
        color: "rgb(8 47 73)",
        url: "./#",
        jobdesk: "Front-end & Back-end",
        nama: "Muhamad Talim"
      },
      {
        image: Afwa,
        color: "rgb(23 37 84)",
        url: "./#",
        jobdesk: "Database Designer & Back-end",
        nama: "Afwa Afini"
      },
      {
        image: Rafi,
        color: "rgb(67 20 7)",
        url: "./#",
        jobdesk: "Front-end",
        nama: "Rafi Fajrul"
      }
    ]
  ];

  return (
    <main>
      <div className="flex flex-col overflow-x-hidden items-center content-center text-white bg-slate-950 w-full pb-24 min-h-[calc(100vh-160.3px)]">
        <Header />
        <div>
          <Image src={BgGradient} className="absolute float-right right-0 mix-blend-hard-light w-[900px] top-0 select-none" draggable="false" />
        </div>
        <p className={`${font.Clash_display_h1bold} flex mx-auto mt-20 mb-16 pb-4 text-center select-none`} draggable="false">Introducing our savvy mastermind</p>
        {dataDev.map((row, index) => (
          <div key={"row" + index} className="mx-auto flex flex-col sm:flex-row flex-wrap justify-center px-2 gap-6 mb-12 select-none" draggable="false">
          {row.map((items, index) => (
            <div key={"card" + index} className="group">
              <div className="relative w-48 rounded-[0.65rem] overflow-hidden text-white">
                <Image alt="profile" src={items.image} className="absolute h-48 grayscale bg-gradient-to-bl from-gray-800 to-gray-900 to-40% object-cover transition-transform duration-[1000ms] transform group-hover:scale-110 "/>
                <div style={{ background: `linear-gradient(to top, ${items.color} 0%, rgba(0, 0, 0, 0) 50%)` }} className={`w-48 h-48 inset-0 opacity-[99%] transition-all duration-[1000ms]`}>
                  <div className="w-48 h-48 inset-0 bg-gradient-to-r from-slate-950 to-[#00000000] to-50% opacity-[99%]">
                    <a href={items.url} className={`${font.Satoshi_c1medium} absolute left-[3.25rem] w-fit h-fit rounded-2xl px-2 py-1 border-[1px] opacity-0 group-hover:translate-y-36 group-hover:opacity-100 transition-all duration-[1000ms]`}>Visit Profile</a>
                    <p className={`${font.Satoshi_c3medium} absolute  bottom-9 left-2 group-hover:-translate-y-24 transition-transform duration-[1000ms]`}>{items.jobdesk}</p>
                    <p className={`${font.Clash_display_h6medium} absolute  bottom-4 left-2 group-hover:-translate-y-32 transition-transform duration-[1000ms]`}>{items.nama}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}