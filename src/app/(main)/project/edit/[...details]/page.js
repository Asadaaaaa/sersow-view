"use client";

import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';

import Main from "./Main";
import Header from '@/components/main/header/Header';
import BgGradient from '@/components/main/BgGradient';
import { IsLogin } from '@/components/main/LoginContext';
import styles from '@/components/main/settings/settings.module.css';

import Category from '@/api/project/category';

export default function EditProject({ params }) {

  const { isLogin } = useContext(IsLogin);

  const router = useRouter();

  if (!isLogin) {
    router.push("home");
  }

  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function category() {
      const res = await Category();

      if(res) {
        if (res.status === "200") {
          setCategory(res.data);
        }
      }
    }

    category();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full relative h-screen">
        <BgGradient />
        <div className={`${styles.settingsContent} w-full max-w-[calc(100vw-120px)] md:max-w-[calc(100vw-268px)] lg:max-w-[calc(100vw-328px)] xl:max-w-[1016px]  overflow-y-auto h-screen`}>
          <Main params={params} category={category} />
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