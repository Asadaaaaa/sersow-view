"use client";

import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from 'next/navigation';

import Form from "./Form";
import Header from "./Header";
import LoadingScreen from "../loading";

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
			<Header />
      <div className="bg-slate-950 relative overflow-hidden py-16 xl:py-28 min-h-[calc(100vh-145.39px)]">
				<div className="bg-gradient"></div>
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