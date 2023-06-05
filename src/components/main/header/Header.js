"use client";

import { useContext } from 'react';

import { IsLogin } from '@/components/main/LoginContext';
import HeaderContent from '@/components/main/header/HeaderContent';

export default function Header() {

  const { isLogin } = useContext(IsLogin);

  return (
    <div className="bg-slate-900/60 w-full h-24 fixed z-10 top-0 pl-24 pt-6 border-solid border-slate-700 border-b-[1px]">
      <HeaderContent isLogin={isLogin} />
    </div>
  );
}