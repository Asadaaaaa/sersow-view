"use client";

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import Main from './Main';
import GlobalError from '@/app/global-error';
import Header from '@/components/main/header/Header';
import { IsLogin, Username } from '@/components/main/LoginContext';

export default function Profile() {

  const { isLogin } = useContext(IsLogin);
  const { username } = useContext(Username);

  const router = useRouter();

  if (!isLogin) {
    router.push("home");
  }

  return (
    <>
      <Header />
      <Main username={username} fallback={<GlobalError />} />
    </>
  );
}