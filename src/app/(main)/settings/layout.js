"use client";

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/main/header/Header';
import BgGradient from '@/components/main/BgGradient';
import { IsLogin } from '@/components/main/LoginContext';

export default function SettingsLayout({ children }) {

  const { isLogin } = useContext(IsLogin);

  const router = useRouter();

  if (!isLogin) {
    router.push("home");
  }

  return (
    <>
      <Header />
      <div className="w-[1016px] relative h-screen">
        <BgGradient />
        <div className="h-screen pt-24 flex justify-center">
          {children}
        </div>
      </div>
    </>
  );
}