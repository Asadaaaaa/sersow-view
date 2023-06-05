import { FaLink, FaEnvelope, FaRegEnvelope, FaRegCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

import font from '@/app/font.module.css';
import BgGradient from '@/components/main/BgGradient';
import styles from '@/components/main/profile/profile.module.css';
import MikaKitchen from '../../../../public/dummy/Mikakitchen.png';

export default function Main() {
  return (
    <div className="w-[1016px] relative h-screen">
      <BgGradient />
      <div className="h-screen pt-24 flex justify-center">
        <div className="h-full py-12 w-fit flex gap-12">
          <div className="h-full flex flex-col gap-4 pt-2 pr-6 w-[216px] boreder-solid border-slate-700 border-r-[1px]">
            <div>
              <Image src={MikaKitchen} className="w-48 h-48" />
            </div>
            <div className="flex justify-center">
              <div className="py-1 px-2">
                <button className={`${font.Satoshi_c2bold} w-[136px] py-2 text-slate-700 bg-slate-200 rounded-3xl`}>Follow</button>
              </div>
              <div className="p-[6px]">
                <button className="border-solid border-slate-300 border-[1px] rounded-full p-2">
                  <FaLink className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
            <div>
              <h3 className={`${font.Satoshi_b2bold} text-white`}>Achingchong</h3>
              <div className="flex justify-between">
                <h5 className={`${font.Satoshi_c2regular} text-slate-400`}>@asadaaaaa</h5>
                <h5 className={`${font.Satoshi_c2regular} text-slate-600`}>They/Them</h5>
              </div>
            </div>
            <div className="py-2 border-solid border-slate-700 border-y-[1px]">
              <h3 className={`${font.Satoshi_c2regular} text-white text-justify`}>
                The enigmatic figure, a master of the digital realm, who effortlessly straddles the world of technology and hacking.
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <div><FaEnvelope className="w-3 h-3 text-slate-600" /></div>
                <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>mikailasada@upi.edu</h4>
              </div>
              <div className="flex gap-2 items-center">
                <div><FaRegEnvelope className="w-3 h-3 text-slate-600" /></div>
                <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>akumikail@gmail.com</h4>
              </div>
              <div className="flex gap-2 items-center">
                <div><FaLink className="w-3 h-3 text-slate-600" /></div>
                <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>https://github.com/asadaaaa</h4>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <div className={`${font.Satoshi_c2regular} text-slate-400`}>
                  <span className={`${font.Satoshi_c2medium} text-white`}>123</span>
                  {" "}followers
                </div>
                <hr className="w-2 border-slate-700" />
                <div className={`${font.Satoshi_c2regular} text-slate-400`}>
                  <span className={`${font.Satoshi_c2medium} text-white`}>456</span>
                  {" "}following
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className={`${font.Satoshi_c2regular} text-slate-400`}>
                  <span className={`${font.Satoshi_c2medium} text-white`}>1</span>
                  {" "}projects
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div><FaRegCalendarAlt className="w-3 h-3 text-slate-600" /></div>
              <div className={`${font.Satoshi_c3regular} text-slate-400`}>since 04-04-2023</div>
            </div>
          </div>
          <div className="w-[560px] h-full">
            <div className={`${font.Satoshi_b2bold} text-slate-400 pb-2 flex gap-2 border-solid border-slate-700 border-b-[1px]`}>
              <div className="py-2 px-4">Projects</div>
              <div className="py-2 px-4">Collabs</div>
              <div className="py-2 px-4">Likes</div>
            </div>
            <div className={`${styles.profileScrollbar} pt-6 overflow-y-auto h-full`}>
              <div className="h-[5000px]">a</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}