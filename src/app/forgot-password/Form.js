"use client";

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Loading } from '@nextui-org/react';

import font from '../font.module.css';
import Input from '@/components/form/Input';

import reqForgotPassword from '@/api/auth/req-forgot-password';

export default function Form () {

  const router = useRouter();

	const [email, setEmail] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [warningText, setWarningText] = useState("");
	const [success, setSuccess] = useState(false);

	const [loading, setLoading] = useState(false);

  const emailPattern = /^[A-Za-z0-9._%+-]+@(upi\.edu|gmail\.com)$/

	return (
		<form className="bg-[rgba(2,6,23,0.5)] px-2 sm:px-12 md:px-28 py-12 sm:py-8 md:py-12 border-solid border-2 border-slate-700 rounded-[40px] sm:rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col flex-wrap gap-4 md:gap-12 text-center items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Forgot password?</h1>
        <div className="flex flex-col gap-4 items-center w-[270px] md:w-[350px]">
          <h6 className={`${font.Satoshi_b2regular} text-white text-center`}>Enter your email and we'll send you a link to get back into your account</h6>
          <Input 
            type={"text"} 
            placeholder={"Email"} 
            maxLength={68}
            value={email} 
            onChange={(e) => {setEmail(e.target.value)}} 
            error={emailError}
            onFocus={() => {
              setEmailError(false);
              setWarningText("");
              setSuccess(false);
            }}
          />
          {warningText && (
            <div className="w-full max-w-[270px] md:max-w-[350px] pt-2">
              <p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
            </div>
          )}
          {success && (
            <div className="w-full max-w-[270px] md:max-w-[350px] pt-2">
              <p className={`${font.Satoshi_b2regular} text-emerald-500`}>Link sent, if your email matches an existing account we will send a password reset email within a few minutes. If you have not received an email check your spam folder or resend</p>
            </div>
          )}
        </div>
				<div className="flex flex-col gap-4 items-center w-full">
          <div className="w-full px-2 py-1">
            <button 
              type="submit"
              disabled={loading}
              className={`${font.Satoshi_b2medium} w-auto px-28 md:px-[150px] py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}
              onClick={async(e) => {
                e.preventDefault();

                setLoading(true);
                
                if (email === "") {
                  setEmailError(true);
                  setWarningText("Please enter your email");
  
                  setLoading(false);
  
                  return;
                }

                if (!emailPattern.test(email)) {
									setEmailError(true);
									setWarningText("Please enter a valid email");

									setLoading(false);

									return;
								}

                const res = await reqForgotPassword(email);

                if (res.status === "200") {
                  toast.success("Email sent", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });

                  setSuccess(true);
                } else if (res.status === "validator") {
                  toast.error("Something Wrong With Your Input", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }

                setLoading(false);
              }}
            >
              {loading ? <Loading type="points-opacity" size="lg" color="white" /> : "Get Link"}
            </button>
          </div>
          <Link href="/login">
            <h4 className={`${font.Satoshi_b2regular} text-cyan-500 text-center`}>I remember my password</h4>
          </Link>
        </div>
			</div>
		</form>
	);
}