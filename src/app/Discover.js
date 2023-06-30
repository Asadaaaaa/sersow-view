import Image from 'next/image';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

import font from './font.module.css';
import DiscoverComponent from '../../public/images/Discover/DiscoverComponent1.svg';
import DiscoverComponentMobile from '../../public/images/Discover/DiscoverComponentMobile.svg';

export default function Discover() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-900/0 relative overflow-hidden">
      <div className="bg-[url(../../public/images/Discover/DiscoverBackground.svg)] w-full bg-repeat-y bg-cover">
        <div className="py-6 xl:px-24 xl:gap-12 xl:py-24 flex flex-col relative z-[1] lg:px-20 lg:gap-10 lg:py-20 md:px-16 md:gap-8 md:py-16 sm:px-12 sm:gap-10 ss:px-4 ss:gap-10">
          <div className="flex justify-between sm:items-start ss:items-center sm:flex-row ss:flex-col-reverse">
            <div className="xl:mt-12 xl:w-60 lg:mt-12 lg:w-44 md:mt-10 md:w-32 md:h-auto sm:mt-8 sm:w-40 ss:mt-4 ss:w-[340px]">
              <Image src={DiscoverComponent} className="hidden sm:block" />
              <Image src={DiscoverComponentMobile} className="block sm:hidden" />
              <div className="w-full mt-4">
                <p className={`${font.Satoshi_b2medium} text-slate-300 text-justify`}>
                  A platform for students and entities associated with the
                  Universitas Pendidikan Indonesia to showcase their projects while
                  aiming to improve accessibility to information about projects
                  within the university community.
                </p>
              </div>
            </div>
            <div className="flex flex-col xl:gap-6 lg:gap-4 md:gap-2 sm:gap-4 ss:gap-3">
              <h1 className={`${font.Clash_display_d2bold} text-white sm:text-right ss:text-center`}>
                DISCOVER
              </h1>
              <div className="flex flex-col sm:items-end ss:items-center gap-4">
                <div className="flex items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 ss:gap-1">
                  <h3 className={`${font.Clash_display_h1medium} sm:text-slate-400 ss:text-slate-100`}>Design</h3>
                  <hr className="xl:w-6 lg:w-6 md:w-6 sm:w-6 ss:w-4 border-[1px] sm:block ss:hidden" />
                </div>
                <div className="flex items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 ss:gap-1">
                  <h3 className={`${font.Clash_display_h1medium} sm:text-slate-400 ss:text-slate-100`}>Research</h3>
                  <hr className="xl:w-12 lg:w-12 md:w-12 sm:w-12 ss:w-8 border-[1px] sm:block ss:hidden" />
                </div>
                <div className="flex items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 ss:gap-1">
                  <h3 className={`${font.Clash_display_h1medium} sm:text-slate-400 ss:text-slate-100`}>Development</h3>
                  <hr className="xl:w-24 lg:w-24 md:w-24 sm:w-24 ss:w-14 border-[1px] sm:block ss:hidden" />
                </div>
                <div className="flex items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 ss:gap-1">
                  <h3 className={`${font.Clash_display_h1medium} sm:text-slate-400 ss:text-slate-100`}>And many more</h3>
                  <hr className="xl:w-48 lg:w-48 md:w-48 sm:w-48 ss:w-24 border-[1px] sm:block ss:hidden" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col xl:gap-6 lg:gap-4 md:gap-2 sm:gap-2 ss:gap-2">
            <div className="flex flex-col sm:flex-row items-start ss:items-center">
              <h2 className={`${font.Clash_display_d3bold} text-slate-200`}>INTERACT</h2>
            </div>
            <div className="flex gap-4 flex-col justify-between items-center sm:flex-row ss:flex-col">
              <div className="flex gap-4 items-center xl:pr-12 lg:pr-8 md:pr-4 sm:pr-2 ss:pr-0">
                <FaHeart color="rgb(236 72 153)" className="h-auto xl:w-10 lg:w-8 md:w-6 sm:w-4 ss:w-3 " />
                <h5 className={`${font.Clash_display_h1medium} text-pink-500`}>Like</h5>
              </div>
              <hr className="w-48 border-[1px] sm:border-white ss:border-slate-700 sm:w-32 sm:border-[1px] ss:w-12 ss:border-[0.2px]" />
              <div className="flex gap-4 items-center xl:px-12 lg:px-8 md:px-4 sm:px-2 ss:px-2">
                <FaComment color="rgb(34 211 238)" className="h-auto xl:w-10 lg:w-8 md:w-6 sm:w-4 ss:w-3 " />
                <h5 className={`${font.Clash_display_h1medium} text-cyan-400`}>Comment</h5>
              </div>
              <hr className="w-48 border-[1px] sm:border-white ss:border-slate-700 sm:w-32 sm:border-[1px] ss:w-12 ss:border-[0.2px]" />
              <div className="flex gap-4 items-center xl:pl-12 lg:pl-8 md:pl-4 sm:pl-2 ss:px-2">
                <FaShare color="rgb(74 222 128)" className="h-auto xl:w-10 lg:w-8 md:w-6 sm:w-4 ss:w-3 " />
                <h5 className={`${font.Clash_display_h1medium} text-green-400`}>Share</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
