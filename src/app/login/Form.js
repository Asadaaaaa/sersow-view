"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Loading } from '@nextui-org/react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import font from '../font.module.css';
import Input from '@/components/form/Input';

import login from '@/api/auth/login';

export default function Form () {
	const userRef = useRef(null);
	const router = useRouter();

	

	const [data, setData] = useState({
		identity: "",
		password: "",
	});

	const [dataError, setDataError] = useState({
		identity: false,
		password: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [warningText, setWarningText] = useState("");

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if(userRef.current){
			userRef.current.focus();
		}
	}, [])

	return (
		<form className="bg-[rgba(2,6,23,0.5)] px-6 sm:px-16 md:px-28 py-6 sm:py-8 md:py-12 border-solid border-2 border-slate-700 rounded-[40px] sm:rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-4 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Login</h1>
				<Input 
					type={"text"} 
					placeholder={"Username or email"} 
					maxLength={68}
					value={data.identity} 
					onChange={(e) => {setData({ ...data, identity: e.target.value})}} 
					error={dataError.identity}
					onFocus={() => {
						setDataError({ ...dataError, identity: false, password: false});
						setWarningText("");
					}}
					refs={userRef}
				/>
				<div className="relative">
					<Input 
						type={showPassword ? "text" : "password"} 
						placeholder={"Password"} 
						value={data.password} 
						maxLength={18}
						onChange={(e) => {setData({ ...data, password: e.target.value})}} 
						error={dataError.password}
						onFocus={() => {
							setDataError({ ...dataError, password: false, identity: false});
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
				{warningText && (
					<div className="w-full max-w-[270px] md:max-w-[350px]">
						<p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
					</div>
				)}
				<div className="w-full mb-6">
					<Link href="/forgot-password">
						<h4 className={`${font.Satoshi_b2regular} text-cyan-500 text-right`}>Forgot your password ?</h4>
					</Link>
				</div>
				<div className="w-full px-2 py-1">
					<button 
						type="submit"
						disabled={loading}
						className={`${font.Satoshi_b2medium} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}
						onClick={async(e) => {
							e.preventDefault();

							setLoading(true);
							
							if (data.identity === "" || data.password === "" || data.password.length < 6) {
								setDataError({ ...dataError, identity: true, password: true});
								setWarningText("Username or password is wrong");

								setLoading(false);

								return;
							}

							const res = await login(data.identity, data.password);

							if (res.status === "200") {
								setCookie("auth", res.data.token);
								setCookie("refreshAuth", res.data.refreshToken);

								router.push("home");
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
								setDataError({ ...dataError, identity: true, password: true});
								setWarningText("Username or password is wrong");
							}

							setLoading(false);
						}}
					>
						{loading ? <Loading type="points-opacity" size="lg" color="white" /> : "Login"}
					</button>
				</div>
				<div>
					<h4 className={`${font.Satoshi_b2regular} text-white`}>Don't have an account ?{" "}<Link href="/register" className="text-cyan-500">Register</Link></h4>
				</div>
			</div>
		</form>
	);
}