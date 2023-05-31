"use client";

import { ToastContainer } from "react-toastify";

import Form from "./Form";
import Header from "../login/Header";

export default function ForgotPassword() {
  return (
    <main>
			<Header />
      <div className="bg-slate-950 relative overflow-hidden py-28 min-h-[calc(100vh-145.39px)]">
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