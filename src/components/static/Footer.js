import Link from 'next/link';
import Image from 'next/image';

import font from '@/app/font.module.css';
import LogoFooter from '../../../public/images/LogoFooter.svg';

export default function Footer({ transparent }) {
  return (
    <div className={"w-full xl:px-24 lg:px-24 md:px-16 sm:px-8 ss:px-8 xl:py-6 lg:py-6 md:py-6 sm:py-5 ss:py-4 border-t-[1px] border-t-solid border-t-slate-700 relative z-[2] " + (transparent ? "bg-slate-900/20" : "bg-slate-900")}>
      <div className="flex sm:flex-row ss:flex-col-reverse justify-between items-center gap-4">
        <div className="flex items-center">
          <Image src={LogoFooter} className="xl:w-64 lg:w-64 md:w-64 sm:w-52 ss:w-44 " />
        </div>
        <div className="flex">
          <div className="flex xl:gap-2 lg:gap-2 md:gap-2 sm:gap-2 ss:gap-2 items-center">
            <Link href="/credits">
              <button className="flex items-center h-fit xl:px-9 lg:px-9 md:px-9 sm:px-9 ss:px-4 xl:py-3 lg:py-3 md:py-3 sm:py-2 ss:py-1  border-solid rounded-xl bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9] transition ease-out delay-100 hover:to-[#22D3EE] hover:shadow-[0px_0px_12px_.5px_#22d3ee] active:shadow-[0_0_0_0] active:scale-[.92] active:from-[rgb(6 182 212)] active:to-[rgb(6 182 212)] active:delay-150">
                <h4 className={`${font.Satoshi_b2bold} text-white`}>Credits</h4>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}