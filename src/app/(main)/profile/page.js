"use client";

import { useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Main from './Main';
import Header from '@/components/main/header/Header';
import { IsLogin } from '@/components/main/LoginContext';

export default function Profile() {

  const { isLogin } = useContext(IsLogin);

  const router = useRouter();

  const pathname = usePathname();
  const slicePath = pathname.split("/");

  if (!isLogin && slicePath.length < 3) {
    router.push("home");
  }

  return (
    <>
      <Header />
      <Main />
    </>
  );
}