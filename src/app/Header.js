"use client";

import Link from 'next/link';
import Image from 'next/image';

import font from './font.module.css';
import LogoTitle from '../../public/images/LogoTitle.svg';
import Logo from '../../public/images/Sersow.png';

export default function Header() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
		<div className="w-full bg-slate-950/60 xl:px-24 lg:px-24 md:px-24 sm:px-16 ss:px-8 py-6 border-b-[1px] border-b-solid border-b-slate-700 fixed top-0 z-[2]">
			<div className="flex justify-between">
				<div className="flex items-center cursor-pointer" onClick={() => scrollToSection("main")}>
					<Image src={LogoTitle} id="logo" className="hidden md:block w-72 pr-8 border-r-[1px] border-r-solid border-r-slate-700" />
          <Image src={Logo} alt="Sersow Logo" className="block md:hidden w-10 h-auto" priority={true} />
				</div>
        <div className="flex xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ss:gap-2 items-center">
          <button className="hidden sm:block flex items-center gap-2 xl:px-6 lg:px-6 md:px-6 sm:px-6 ss:px-4 xl:py-3 lg:py-3 md:py-3 sm:py-2 ss:py-1" onClick={() => scrollToSection("faqs")}>
            <h4 className={`${font.Satoshi_b2medium} text-white`}>FAQ</h4>
          </button>
          <button className="hidden sm:block flex items-center gap-2 xl:px-6 lg:px-6 md:px-6 sm:px-6 ss:px-4 xl:py-3 lg:py-3 md:py-3 sm:py-2 ss:py-1" onClick={() => scrollToSection("credits")}>
            <h4 className={`${font.Satoshi_b2medium} text-white`}>Credits</h4>
          </button>
          <div className="xl:px-2 lg:px-2 md:px-2 sm:px-2 ss:px-1 py-1">
            <Link href="/register">
              <button className="flex items-center gap-2 xl:px-6 lg:px-6 md:px-6 sm:px-6 ss:px-7 xl:py-3 lg:py-3 md:py-3 md:m-0 sm:py-2 ss:py-2 ss:-m-3 bg-gradient-to-b from-purple-500 to to-violet-600 md:rounded-xl ss:rounded-3xl hover:drop-shadow-[0px_0px_4px_rgba(168,85,247,0.4)] transition-all">
                <h4 className={`${font.Satoshi_b2medium} text-white`}>Register</h4>
              </button>
            </Link>
          </div>
        </div>
			</div>
		</div>
	);
}