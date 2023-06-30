import Link from 'next/link';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa';

import font from '@/app/font.module.css';
import LogoTitle from '../../../public/images/LogoTitle.svg';
import Logo from '../../../public/images/Sersow.png';

export default function Header() {
  return (
    <div className="w-full bg-slate-900 xl:px-24 lg:px-24 md:px-16 sm:px-12 px-4 py-6 border-b-[1px] border-b-solid border-b-slate-700 relative z-[2]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={LogoTitle}
              className="hidden md:block w-56 lg:w-72 pr-8 border-r-[1px] border-r-solid border-r-slate-700 cursor-pointer" priority={true}
            />
            <Image 
              src={Logo} 
              className="block md:hidden w-10 h-auto" priority={true} 
            />
          </Link>
          <Link
            href="/home"
            className={`${font.Satoshi_b2medium} pl-4 md:pl-8 text-slate-200 transition ease-out delay-150 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-[.92] active:delay-150`}
          >
            Home
          </Link>
        </div>
        <div className="flex justify-between items-center gap-3 md:gap-8">
          <Link href="/register">
            <button className="registerBtn flex items-center gap-2 px-4 md:px-9 py-2 md:py-3 border-solid rounded-xl bg-gradient-to-b from-[#A855F7] to-[#7C3AED] transition ease-out delay-100 hover:from-[#A855F7] hover:to-[#A855F7] hover:shadow-[0_0_8px_.3px_#A855F7] active:scale-[.92] active:delay-150 active:from-purple-600 active:to-purple-600">
              <h4 className={`${font.Satoshi_b2medium} text-white`}>Register</h4>
            </button>
          </Link>
          <Link href="/login">
            <button className="loginBtn flex items-center gap-2 px-4 md:px-9 py-2 md:py-3 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-150 hover:shadow-[0_0_4px_1px_white] hover:shadow-inner-[0_0_3px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150">
              <div>
                <FaSignInAlt className="text-white" />
              </div>
              <h4 className={`${font.Satoshi_b2medium} text-white`}>Log in</h4>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
