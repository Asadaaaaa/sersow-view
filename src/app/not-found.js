import Image from 'next/image';
import font from './font.module.css';
import Header from './components/Header';
import RGradient from '../../public/images/rGradient.svg';
import LGradient from '../../public/images/lGradient.svg';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <main>
      <Header/>
        <div className="">
          <div className="bg-slate-950 flex overflow-hidden -mb-32">
            <div className="relative w-full">
              <Image src={RGradient} className="float-right"/>
              <Image src={LGradient} className=""/>
            </div>
            <div className="absolute w-full py-48 mt-24">
              <div className="flex flex-col gap-16 items-center relative z-[2]">
                <h1 className={`${font.Clash_display_d6bold} text-red-500 font-l text-center`}> 4 4</h1>
                <p className="text-center text-white">Sersow is a project showcase app for uploading and showcasing their project work, interact with others, seek ideas and find collaborators or teams.</p>
              </div>
            </div>  
          </div>
          <Footer/>
        </div>
      
    </main>
  );
}
