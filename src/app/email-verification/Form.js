import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

import font from '../font.module.css';
import Input from '@/components/form/Input';

import validCode from '@/api/auth/valid-code';
import resendCode from '@/api/auth/resend-code';

export default function Form () {
	
	const router = useRouter();

	const [code, setCode] = useState("");
	const [codeError, setCodeError] = useState(false);
	const [warningText, setWarningText] = useState(false);
	const [timer, setTimer] = useState(30);
	const [resendDisabled, setResendDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const startTimer = () => {
		setTimer(30);
		setResendDisabled(true);

		const resendInterval = setInterval(() => {
			setTimer(timer => timer - 1);
		}, 1000);

		setTimeout(() => {
			clearInterval(resendInterval);
			setTimer(0);
			setResendDisabled(false);
		}, 30000);
	};

	const handleResendClick = () => {
		startTimer();
	};

	useEffect(() => {
		startTimer();
	}, []);

	useEffect(() => {
		if (timer === 0) {
			setResendDisabled(false);
		}
	}, [timer]);

	return (
		<form className="bg-[rgba(2,6,23,0.5)] px-2 sm:px-12 md:px-28 py-24 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-4 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Email Verification</h1>
				<h6 className={`${font.Satoshi_b2regular} text-white`}>Open your email and find the verification code</h6>
				<Input 
					type={"text"} 
					placeholder={"Verification Code"} 
					maxLength={6}
					value={code} 
					onChange={(e) => {setCode(e.target.value)}} 
					error={codeError}
					onFocus={() => {
						setCodeError(false);
						setWarningText("");
					}}
				/>
				{warningText && (
					<div className="w-full max-w-[350px]">
						<p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
					</div>
				)}
				<div>
					<h4 className={`${font.Satoshi_b2regular} text-white`}>
						Didn't receive a code ?{" "}
						<span 
							className={"text-cyan-500 " + (resendDisabled ? "cursor-default" : "cursor-pointer")}
							onClick={resendDisabled ? () => {} : async() => {

								handleResendClick();

								const res = await resendCode(getCookie("regAuth"));

								if (res.status === "200") {
									toast.success("Resend Success", {
										position: "top-center",
										autoClose: 3000,
										hideProgressBar: true,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "colored",
									});
								} else if (res.status === "token") {
									toast.error("Request Unauthorized", {
										position: "top-center",
										autoClose: 3000,
										hideProgressBar: true,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "colored",
									});
	
									router.push("register");
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
									toast.error("Request Unauthorized", {
										position: "top-center",
										autoClose: 3000,
										hideProgressBar: true,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "colored",
									});

									router.push("register");
								} else if (res.status === "-2") {
									toast.error("Email Already Verified", {
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
								} else if (res.status === "-3") {
									toast.error("Resend On Cooldown", {
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
							Resend {timer !== 0 ? "(" + timer + ")" : ""}
						</span>
					</h4>
				</div>
				<div className="w-full px-2 py-1">
					<button 
						type="submit"
						disabled={loading}
						className={`${font.Satoshi_b2medium} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}
						onClick={async(e) => {
							e.preventDefault();

							setLoading(true);

							if (code.length < 6) {
								setCodeError(true);
								setWarningText("Your verification code is invalid");

								setLoading(false);

								return;
							}

							const res = await validCode(getCookie("regAuth"), code);

							if (res.status === "200") {
								setCookie("auth", res.data.token);
								setCookie("refreshAuth", res.data.refreshToken);
								deleteCookie("regAuth");

								router.push("home");
							} else if (res.status === "token") {
								toast.error("Request Unauthorized", {
									position: "top-center",
									autoClose: 3000,
									hideProgressBar: true,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: "colored",
								});

								router.push("register");
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
								setCodeError(true);
								setWarningText("Your verification code is invalid");
							} else if (res.status === "-2") {
								setCodeError(true);
								setWarningText("Your verification code has expired");
							}

							setLoading(false);
						}}
					>
						{loading ? <Loading type="points-opacity" size="lg" color="white" /> : "Verify Email"}
					</button>
				</div>
			</div>
		</form>
	);
}