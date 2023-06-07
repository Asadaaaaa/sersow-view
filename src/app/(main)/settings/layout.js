"use client";

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { useState, useContext, useEffect } from 'react';

import Header from '@/components/main/header/Header';
import BgGradient from '@/components/main/BgGradient';
import { DataProfile } from '@/components/main/settings/Context';
import { IsLogin, Username } from '@/components/main/LoginContext';
import styles from '@/components/main/settings/settings.module.css';

import Profile from '@/api/profile/profile';

export default function SettingsLayout({ children }) {

  const { isLogin } = useContext(IsLogin);
  const { username } = useContext(Username);

  const router = useRouter();

  if (!isLogin) {
    router.push("home");
  }

  const [dataProfile, setDataProfile] = useState(null);

  useEffect(() => {
    async function getProfile() {
      let res;

      res = await Profile(username, getCookie("auth"));

      if (res.status === "200") {
        return res;
      } else if (res.status === "unauth") {
        deleteCookie("auth");
        deleteCookie("refreshAuth");

        location.reload();
      }
    }

    async function fetchData() {
      const res = await getProfile();

      if (res.status === "200") {
        setDataProfile(res.data);
      }
    }

    if (isLogin) {
      fetchData();
    }
  }, [])

  return (
    <>
      <Header />
      <div className="w-full relative h-screen">
        <BgGradient />
        <div className={`${styles.settingsContent} w-full max-w-[calc(100vw-376px)] xl:max-w-[1016px] overflow-y-auto h-screen`}>
          {
            dataProfile && (
              <DataProfile.Provider value={{ dataProfile: dataProfile }}>
                {children}
              </DataProfile.Provider>
            )
          }
          <ToastContainer
            position="bottom-right"
            autoClose={1250}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </>
  );
}