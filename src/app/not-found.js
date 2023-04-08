import Image from 'next/image';
import font from './font.module.css';
import Header from './Header';
import Footer from './Footer';

import RGradient from '../../public/images/rGradient.svg';
import LGradient from '../../public/images/lGradient.svg';
import IconNol from '../../public/images/iconNol.svg';

export default function NotFound() {
  return (
    <main>
      <Header/>
        <div className="">
          <div className="bg-slate-950 flex -mb-36">
            <div className="relative w-full mb-4">
              <Image src={RGradient} className="mix-blend-plus-lighter float-right z-[0]"/>
              <Image src={LGradient} className="mix-blend-hard-light mt-24 z-[1]"/>
            </div>
            <div className="absolute w-full py-24 mt-2">
              <div className="flex flex-col gap-y-16 -gap-x-8  items-center z-[2]">
                <h1 className={`${font.Clash_display_d1bold} text-white flex items-center text-center pl-20`}><span className='text-cyan-500 absolute -translate-x-24'>4</span> <Image src={IconNol}/> <span className=' absolute translate-x-40'>4</span></h1>
                <div className="flex flex-col gap-4 item-center relative z-[3]">
                  <h2 className={`${font.Clash_display_h1medium} text-center text-white`}>Congrats! You just find an easter egg</h2>
                  <p className={`${font.Clash_display_h5medium} text-center text-gray-500`}>Nah, just kidding. You're lost within the mist.</p>
                </div>
                <button className="respawnBtn flex items-center gap-8 px-8 py-4 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-150 hover:shadow-[0_0_4px_1px_white] hover:shadow-inner-[0_0_3px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150">
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
