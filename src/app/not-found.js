import Image from 'next/image';
import font from './font.module.css';
import Header from './components/Header';
import Footer from './components/Footer';

import RGradient from '../../public/images/rGradient.svg';
import LGradient from '../../public/images/lGradient.svg';
import IconNol from '../../public/images/iconNol.svg';

export default function NotFound() {
  return (
    <main>
      <Header/>
        <div className="">
          <div className="bg-slate-950 flex overflow-hidden -mb-32">
            <div className="relative w-full mb-12">
              <Image src={RGradient} className="float-right z-[0]"/>
              <Image src={LGradient} className=" mt-24 z-[1]"/>
            </div>
            <div className="absolute w-full py-24 mt-2">
              <div className="flex flex-col gap-12  items-center relative z-[2]">
                <h1 className={`${font.Clash_display_d1bold} text-white flex items-center text-center`}> 4 <Image src={IconNol}/> 4</h1>
                <div className="flex flex-col gap-4 item-center relative z-[3]">
                <h2 className={`${font.Clash_display_h1medium} text-center text-white`}>Congrats! You just find an easter egg</h2>
                <p className={`${font.Clash_display_h5medium} text-center text-gray-500`}>Nah, just kidding. You're lost within the mist.</p>
                </div>
                <button className="flex items-center gap-8 px-8 py-4 border-[1px] border-solid border-slate-300 rounded-xl">
                  <h5 className={`${font.Clash_display_h5medium} text-white`}>Respawn here</h5>
                </button>
              </div>
            </div>  
          </div>
          <Footer/>
        </div>
      
    </main>
  );
}
