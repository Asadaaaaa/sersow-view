"use client";

import { ToastContainer } from 'react-toastify';

import Form from './Form';
import Header from '@/components/form/Header';
import BgGradient from '@/components/form/BgGradient';

export default function ForgotPassword() {
  return (
    <main>
			<Header register={true} login={false} />
      <div className="bg-slate-950 relative overflow-hidden py-20 md:py-28 min-h-[620px] md:min-h-[calc(100vh-145.39px)]">
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