"use client";

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Loading } from '@nextui-org/react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

import font from '../font.module.css';
import Input from '@/components/form/Input';

import newForgotPassword from '@/api/auth/new-forgot-password';

export default function Form () {

  const router = useRouter();
  const token = useSearchParams().get('token');

  const [data, setData] = useState({
		password: "",
		confirmPassword: "",
	});

	const [dataError, setDataError] = useState({
		password: false,
		confirmPassword: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [warningText, setWarningText] = useState("");

	const [loading, setLoading] = useState(false);

	const passwordPattern = /^\S+$/;

	return (
		<form className="bg-[rgba(2,6,23,0.5)] px-2 sm:px-12 md:px-28 py-12 sm:py-8 md:py-12 border-solid border-2 border-slate-700 rounded-[40px] sm:rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-12 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Set a new password</h1>
        <div className="flex flex-col gap-4 items-center w-[270px] md:w-[350px]">
          <h6 className={`${font.Satoshi_b2regular} text-white text-center`}>Your new password must be different from previous used pasword</h6>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder={"New Password"} 
              value={data.password} 
              maxLength={18}
              onChange={(e) => {setData({ ...data, password: e.target.value})}} 
              error={dataError.password}
              onFocus={() => {
                setDataError({ ...dataError, password: false, confirmPassword: false});
                setWarningText("");
              }}
            />
            <div className="absolute right-0 top-0 h-full flex items-center">
              <div 
                className="text-slate-600 text-2xl pr-5 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {
                  showPassword ? (
                    <FaRegEyeSlash />
                  ) : (
                    <FaRegEye />
                  )
                }
              </div>
            </div>
          </div>
          <div className="relative">
            <Input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder={"Confirm a new password"} 
              maxLength={18}
              value={data.confirmPassword} 
              onChange={(e) => {setData({ ...data, confirmPassword: e.target.value})}} 
              error={dataError.confirmPassword}
              onFocus={() => {
                setDataError({ ...dataError, password: false, confirmPassword: false});
                setWarningText("");
              }}
            />
            <div className="absolute right-0 top-0 h-full flex items-center">
              <div 
                className="text-slate-600 text-2xl pr-5 cursor-pointer"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {
                  showConfirmPassword ? (
                    <FaRegEyeSlash />
                  ) : (
                    <FaRegEye />
                  )
                }
              </div>
            </div>
          </div>
          {warningText && (
            <div className="w-full max-w-[350px]">
              <p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
            </div>
          )}
        </div>
        <div className="w-full px-2 py-1">
          <button 
            type="submit"
            disabled={loading}
            className={`${font.Satoshi_b3bold} w-auto px-28 md:px-[150px] py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}
            onClick={async(e) => {
              e.preventDefault();

              setLoading(true)

              if (data.password === "") {
                setDataError({ ...dataError, password: true});
                setWarningText("Password can't be empty");

                setLoading(false);

                return;
              }

              if (data.password.length < 6) {
                setDataError({ ...dataError, password: true});
                setWarningText("Minimum length for password is 6 characters");

                setLoading(false);

                return;
              }

              if (!passwordPattern.test(data.password)) {
                setDataError({ ...dataError, password: true, confirmPassword: true});
                setWarningText("Input should consist of a single sequence of non-whitespace characters.");

                setLoading(false);

                return;
              }

              if (data.password !== data.confirmPassword) {
                setDataError({ ...dataError, password: true, confirmPassword: true});
                setWarningText("Passwords can't be different");

                setLoading(false);

                return;
              }

              const res = await newForgotPassword(token, data.password);

              if (res.status === "200") {
								toast.success("Password successfully changed", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });

                router.push("login");
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
							} else if (res.status === "-1") {
								toast.error("Your link is invalid", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });

                router.push("forgot-password");
							}

              setLoading(false);
            }}
          >
            {loading ? <Loading type="points-opacity" size="lg" color="white" /> : "Reset Password"}
          </button>
        </div>
			</div>
		</form>
	);
}