"use client";

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from './Form';
import LoadingScreen from '../loading';
import Header from '@/components/form/Header';
import BgGradient from '@/components/form/BgGradient';

export default function NewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    if (searchParams.get('token') === null) {
      router.push("forgot-password");
    } else {
      setLoadingScreen(false);
    }
  }, []);

  return loadingScreen ? (<LoadingScreen />) : (
    <main>
			<Header register={true} login={true} />
      <div className="bg-slate-950 relative overflow-hidden py-16 md:py-28 min-h-[620px] md:min-h-[calc(100vh-145.39px)]">
        <BgGradient />
        <div className="flex flex-col gap-16 items-center relative z-[2]">
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