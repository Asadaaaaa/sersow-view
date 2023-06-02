import Link from 'next/link';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa'

import font from '@/app/font.module.css';
import LogoTitle from '../../../public/images/LogoTitle.svg';

export default function Header({ login, register }) {
  return (
		<div className="w-full bg-slate-900 px-24 py-12 border-b-[1px] border-b-solid border-b-slate-700 relative z-[2]">
			<div className="flex justify-between">
				<div className="flex items-center">
          <Link href="/">
					  <Image src={LogoTitle} className="w-72 pr-8 border-r-[1px] border-r-solid border-r-slate-700 cursor-pointer" />
          </Link>
          <Link href="/home">
					  <h3 className={`${font.Satoshi_b2medium} pl-8 text-slate-200`}>Home</h3>
          </Link>
				</div>
        <div className="flex gap-2 items-center">
          {
            register && (
              <div className="px-2 py-1">
                <Link href="/register">
                  <button className="flex items-center gap-2 px-9 py-3 bg-gradient-to-b from-purple-500 to to-violet-600 rounded-xl hover:drop-shadow-[0px_0px_4px_rgba(168,85,247,0.4)] transition-all">
                    <h4 className={`${font.Satoshi_b2medium} text-white`}>Register</h4>
                  </button>
                </Link>
              </div>
            )
          }
          {
            login && (
              <div className="px-2 py-1">
                <Link href="/login">
                  <button className="flex items-center gap-2 px-9 py-3 border-[1px] border-solid border-slate-300 rounded-xl">
                    <div>
                      <FaSignInAlt className="text-white" />
                    </div>
                    <h4 className={`${font.Satoshi_b2medium} text-white`}>Log in</h4>
                  </button>
                </Link>
              </div>
            )
          }
        </div>
			</div>
		</div>
	);
}