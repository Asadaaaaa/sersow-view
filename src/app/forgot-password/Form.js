"use client";

import Link from 'next/link';
import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { Loading } from "@nextui-org/react";

import Input from '../register/Input';
import font from '../font.module.css';
import { HOST, VERSION } from '../../../config.js';

export default function Form () {

  const router = useRouter();

	const [email, setEmail] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [warningText, setWarningText] = useState("");

	const [loading, setLoading] = useState(false);

  const emailPattern = /^[A-Za-z0-9._%+-]+@(upi\.edu|gmail\.com)$/

	return (
		<div className="bg-[rgba(2,6,23,0.5)] px-28 py-12 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-12 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Forgot your password ?</h1>
        <div className="flex flex-col gap-4 items-center w-[350px]">
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
            }}
          />
          {warningText && (
            <div className="w-full max-w-[350px] pt-2">
              <p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
            </div>
          )}
        </div>
				<div className="flex flex-col gap-4 items-center w-full">
          <div className="w-full px-2 py-1">
            <button 
              disabled={loading}
              className={`${font.Satoshi_b2medium} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}
              onClick={async() => {

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
  
                await fetch(HOST + "/" + VERSION + "/auth/req-forgot-password", {
                  method: 'POST',
                  headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email,
                  })
                }).then(res => res.json()).then(res => {
  
                  if(res.status === 200) {
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

                    console.log(1);
                  } else {
                    if (res.err) {
                      if (res.err.type === "validator") {
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
                    }
                  }
                }).catch((err) => {
                }).finally(() => {
                  setLoading(false);
                });
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
		</div>
	);
}