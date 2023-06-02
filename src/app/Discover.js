import Image from 'next/image';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

import font from './font.module.css';
import DiscoverComponent from '../../public/images/Discover/DiscoverComponent1.svg';

export default function Discover() {
  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-900/0 relative overflow-hidden">
      <div className="bg-[url(../../public/images/Discover/DiscoverBackground.svg)] w-full bg-repeat-y bg-cover">
        <div className="p-24 flex flex-col gap-12 relative z-[1]">
          <div className="flex justify-between">
            <div className="mt-12 w-60">
              <Image src={DiscoverComponent} />
              <div className="w-full mt-4">
                <p className={`${font.Satoshi_b2medium} text-slate-300 text-justify`}>
                  A platform for students and entities associated with the
                  Universitas Pendidikan Indonesia to showcase their projects while
                  aiming to improve accessibility to information about projects
                  within the university community.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className={`${font.Clash_display_d2bold} text-white text-right`}>
                DISCOVER
              </h1>
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-4">
                  <h3 className={`${font.Clash_display_h1medium} text-slate-400`}>Design</h3>
                  <hr className="w-6 border-[1px]" />
                </div>
                <div className="flex items-center gap-4">
                  <h3 className={`${font.Clash_display_h1medium} text-slate-400`}>Research</h3>
                  <hr className="w-12 border-[1px]" />
                </div>
                <div className="flex items-center gap-4">
                  <h3 className={`${font.Clash_display_h1medium} text-slate-400`}>Development</h3>
                  <hr className="w-24 border-[1px]" />
                </div>
                <div className="flex items-center gap-4">
                  <h3 className={`${font.Clash_display_h1medium} text-slate-400`}>And many more</h3>
                  <hr className="w-48 border-[1px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className={`${font.Clash_display_d3bold} text-slate-200`}>INTERACT</h2>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center pr-12">
                <FaHeart color="rgb(236 72 153)" className="w-10 h-10" />
                <h5 className={`${font.Clash_display_h1medium} text-pink-500`}>Like</h5>
              </div>
              <hr className="w-48 border-[1px]" />
              <div className="flex gap-4 items-center px-12">
                <FaComment color="rgb(34 211 238)" className="w-10 h-10" />
                <h5 className={`${font.Clash_display_h1medium} text-cyan-400`}>Comment</h5>
              </div>
              <hr className="w-48 border-[1px]" />
              <div className="flex gap-4 items-center pl-12">
                <FaShare color="rgb(74 222 128)" className="w-10 h-10" />
                <h5 className={`${font.Clash_display_h1medium} text-green-400`}>Share</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
