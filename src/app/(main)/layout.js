"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next';

import Loading from '@/app/loading';
import font from '@/app/font.module.css';
import styles from '@/components/main/main.module.css';
import Sidebar from '@/components/main/sidebar/Sidebar';
import { IsLogin, Username } from '@/components/main/LoginContext';

import Logo from '../../../public/images/Sersow.png';

import TokenCheck from '@/api/auth/token-check';
import RefreshToken from '@/api/auth/refresh-token';

export default async function MainLayout(props) {

  const [data, setData] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  
  useEffect(() => {
    async function getNewToken(auth, refreshAuth) {
      const res = await RefreshToken(auth, refreshAuth);
    
      if (res.status === "200") {
        setCookie("auth", res.data.token);
        setCookie("refreshAuth", res.data.refreshToken);
    
        return;
      } else {
        deleteCookie("auth");
        deleteCookie("refreshAuth");
    
        return;
      }
    };

    async function getLoginData() {
      if (hasCookie("auth")) {
        const res = await TokenCheck(getCookie("auth"));
      
        if (res.status === "200") {
          return res;
        } else if (res.status === "-3") {
          await getNewToken(getCookie("auth"), getCookie("refreshAuth"));
    
          return await getLoginData();
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    async function fetchData() {
      const resData = await getLoginData();

      setData(resData);
      setIsLogin(!!resData);
    }

    fetchData();
  }, []);

  return (isLogin === null || data === null) ? (<Loading />) : (
    <>
      <main className="w-screen h-screen sm:flex hidden">
        <div className="grow h-screen bg-slate-900"></div>
        <IsLogin.Provider value={{ isLogin }}>
          <div className="grow-0 h-screen flex">
            <Sidebar image={data ? data.data.image : ""} name={data ? data.data.name : ""} username={data ? data.data.username : ""} />
            <div className={`${styles.mainScrollbar} w-[1016px] overflow-y-auto`}>
              <Username.Provider value={{ username: data ? data.data.username : null }}>
                {props.children}
              </Username.Provider>
            </div>
          </div>
        </IsLogin.Provider>
        <div className="grow h-screen"></div>
      </main>
      <main className="bg-slate-950 w-screen h-screen flex flex-col justify-center items-center gap-8 px-6 sm:hidden">
        <Image src={Logo} alt="sersow" className="w-32 h-auto" />
        <h3 className={`${font.Satoshi_h6medium} text-white text-center`}>Opps, my bad! Our website is under construction and not mobile-friendly yet. But don't worry, we're working hard to make it mobile-ready. Hang tight, it's coming soon!</h3>
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-3 border border-solid border-slate-300 rounded-md transition ease-out delay-150 hover:shadow-[0_0_4px_1px_white] hover:shadow-inner-[0_0_3px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150">
            <div>
              <FaSignOutAlt className="text-white" />
            </div>
            <h4 className={`${font.Satoshi_b1medium} text-white`}>Go Back</h4>
          </button>
        </Link>
      </main>
    </>
  );
}