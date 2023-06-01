"use client";

import { useContext } from "react";

import { ContentFilter } from "./Context";
import font from "../../../app/font.module.css";

export default function ToggleFilter() {

  const { contentFilter, setContentFilter } = useContext(ContentFilter);

  const navbarMenu = [
    {
      menu: "For You",
      value: 0,
    },
    {
      menu: "Following",
      value: 1,
    },
  ]

  return (
    <div className="flex items-center gap-2 pr-12 border-solid border-slate-700 border-r-[1px]">
      {navbarMenu.map((item) => (
        <div 
          key={item.value}
          className={`${font.Satoshi_b2bold} py-2 px-4 cursor-pointer select-none rounded-full transition-all ` + (item.value === contentFilter ? "text-cyan-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800")}
          onClick={() => setContentFilter(item.value)}
        >
          {item.menu}
        </div>
      ))}
    </div>
  );
}