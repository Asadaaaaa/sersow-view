"use client";

import { FaSearch } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import font from '@/app/font.module.css';
import HomeToggleFilter from '@/components/main/home/ToggleFilter';
import DiscoverToggleFilter from '@/components/main/discover/ToggleFilter';

export default function HeaderContent({ isLogin }) {
  const pathName = usePathname();
  const rootPageName = pathName.split("/")[1];
  const page = rootPageName.charAt(0).toUpperCase() + rootPageName.slice(1);

  return (
    <div className="flex gap-12 items-center">
      {
        (page === "Home" && isLogin) && (
          <HomeToggleFilter />
        )
      }
      <div className="relative">
        <span className="absolute flex justify-end items-center w-[54px] h-full pr-3">
          <FaSearch className="w-[18px] h-[18px] text-white" />
        </span>
        <input 
          type="text" 
          placeholder="Search..."
          className={`${font.Satoshi_c1regular} w-56 bg-slate-800 text-white pl-[54px] pr-[13px] py-[13px] border-solid border-slate-700 border-[1px] rounded-xl transition-all ease-linear hover:border-slate-500 focus:outline-none focus:border-white focus:w-[312px]`} 
        />
      </div>
      {
        page === "Discover" && (
          <DiscoverToggleFilter />
        )
      }
    </div>
  );
}