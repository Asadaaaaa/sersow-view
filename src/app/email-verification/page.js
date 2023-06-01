"use client"

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Form from './Form';
import Loading from '../loading';
import ProgressTwo from './ProgressTwo';
import Header from '@/components/form/Header';

export default function EmailVerification() {

  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!getCookie("auth")) {
      router.push("register");
    }

    setIsAuth(true);
  }, []);

  return !isAuth ? (
    <Loading />
  ) : (
    <main>
			<Header register={false} login={true} />
      <div className="bg-slate-950 relative overflow-hidden py-16 min-h-[calc(100vh-145.39px)]">
				<div className="bg-gradient"></div>
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<ProgressTwo />
					<Form />
				</div>
      </div>
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
    </main>
  );
}