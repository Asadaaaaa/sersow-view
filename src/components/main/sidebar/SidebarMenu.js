"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaHashtag, FaUser, FaCog } from 'react-icons/fa';

import font from '@/app/font.module.css';

export default function SidebarMenu({ isLogin }) {

  const pathName = usePathname();
  const rootPageName = pathName.split("/")[1];
  const page = rootPageName.charAt(0).toUpperCase() + rootPageName.slice(1);

  const pages = [
    {
      icon: <FaHome className="w-6 h-6" />,
      text: "Home",
      isLogin: false,
    },
    {
      icon: <FaHashtag className="w-6 h-6" />,
      text: "Discover",
      isLogin: false,
    },
    {
      icon: <FaUser className="w-6 h-6" />,
      text: "Profile",
      isLogin: true,
    },
    {
      icon: <FaCog className="w-6 h-6" />,
      text: "Settings",
      isLogin: true,
    },
  ]
  
  const filteredPages = pages.filter((page) => {
    if (isLogin) {
      return page;
    } else {
      return page.isLogin === isLogin;
    }
  });

  return (
    <div className="flex flex-col gap-2">
      {filteredPages.map((item) => (
        <Link href={item.text.toLowerCase()} key={item.text + " page"}>
          <div className={"flex items-center gap-2 px-6 py-3 select-none rounded-full transition-all " + (page === item.text ? "text-cyan-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800")}>
            <div>
              {item.icon}
            </div>
            <span className={`${font.Satoshi_h6bold}`}>{item.text}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}