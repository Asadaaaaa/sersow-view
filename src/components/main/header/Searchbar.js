"use client";

import { getCookie } from 'cookies-next';
import { FaSearch } from 'react-icons/fa';
import { useState, useContext } from 'react';

import font from '@/app/font.module.css';
import { ContentFilter } from "@/components/main/discover/Context";

import SearchUsername from '@/api/profile/search-username';
import SearchProjectTitle from '@/api/project/search-project-title';

export default function Searchbar() {

  const [dataSearch, setDataSearch] = useState("");
  const { contentFilter, setProjectContent, setUserContent } = useContext(ContentFilter);

  async function search() {
    if (search) {
      if (contentFilter === 0) {
        const res = await SearchProjectTitle(dataSearch, getCookie("auth"));

        if (res) {
          if (res.status === "200") {
            setProjectContent(res.data);
          } else if (res.status === "unauth") {
            location.reload();
          } else {
            setProjectContent("");
            setDataSearch("");
          }
        } else {
          setProjectContent("");
          setDataSearch("");
        }
      } else if (contentFilter === 1) {
        const res = await SearchUsername(dataSearch, "25", getCookie("auth"));

        if (res) {
          if (res.status === "200") {
            setUserContent(res.data);
          } else if (res.status === "unauth") {
            location.reload();
          } else {
            setUserContent("");
            setDataSearch("");
          }
        } else {
          setUserContent("");
          setDataSearch("");
        }
      }
    } else {
      setProjectContent("");
      setUserContent("");
    }
  }

  return (
    <div className="relative">
      <span className="absolute flex justify-end items-center w-[54px] h-full pr-3">
        <FaSearch className="w-[18px] h-[18px] text-white" />
      </span>
      <input 
        type="text" 
        placeholder="Search..."
        className={`${font.Satoshi_c1regular} w-56 bg-slate-800 text-white pl-[54px] pr-[13px] py-[13px] border-solid border-slate-700 border-[1px] rounded-xl transition-all ease-linear hover:border-slate-500 focus:outline-none focus:border-white focus:w-[312px]`} 
        value={dataSearch}
        onChange={(e) => {
          setDataSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
      />
    </div>
  );
}