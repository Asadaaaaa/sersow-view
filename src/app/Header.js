"use client";

import Link from 'next/link';
import Image from 'next/image';

import font from './font.module.css';
import LogoTitle from '../../public/images/LogoTitle.svg';

export default function Header() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
		<div className="w-full bg-slate-950/60 px-24 py-6 border-b-[1px] border-b-solid border-b-slate-700 fixed top-0 z-[2]">
			<div className="flex justify-between">
				<div className="flex items-center cursor-pointer" onClick={() => scrollToSection("main")}>
					<Image src={LogoTitle} className="w-72 pr-8 border-r-[1px] border-r-solid border-r-slate-700" />
				</div>
        <div className="flex gap-4 items-center">
          <button className="flex items-center gap-2 px-6 py-3" onClick={() => scrollToSection("faqs")}>
            <h4 className={`${font.Satoshi_b2medium} text-white`}>FAQ</h4>
          </button>
          <button className="flex items-center gap-2 px-6 py-3" onClick={() => scrollToSection("credits")}>
            <h4 className={`${font.Satoshi_b2medium} text-white`}>Credits</h4>
          </button>
          <div className="px-2 py-1">
            <Link href="/register">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-purple-500 to to-violet-600 rounded-xl hover:drop-shadow-[0px_0px_4px_rgba(168,85,247,0.4)] transition-all">
                <h4 className={`${font.Satoshi_b2medium} text-white`}>Register</h4>
              </button>
            </Link>
          </div>
        </div>
			</div>
		</div>
	);
}