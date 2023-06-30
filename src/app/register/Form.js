"use client";

import Link from 'next/link';
import { useState } from 'react';
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { Loading } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import font from '../font.module.css';
import Input from '@/components/form/Input';
import styles from "@/components/form/form.module.css";

import register from '@/api/auth/register';

export default function Form () {

	const router = useRouter();

	const [data, setData] = useState({
		name: "",
		emailUpi: "",
		password: "",
		confirmPassword: "",
		gender: "",
		tac: false,
	});

	const [dataError, setDataError] = useState({
		name: false,
		emailUpi: false,
		password: false,
		confirmPassword: false,
		gender: false,
		tac: false,
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [warningText, setWarningText] = useState("");

	const [loading, setLoading] = useState(false);

	const dataPattern = {
		name: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
		emailUpi: /^[a-zA-Z0-9._%+-]+$/,
		password: /^\S+$/,
	};

	return (
		<form className="bg-[rgba(2,6,23,0.5)] px-6 sm:px-16 md:px-28 py-6 sm:py-8 md:py-12 border-solid border-2 border-slate-700 rounded-[40px] sm:rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-5 md:gap-4 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Create new account</h1>
				<Input 
					type={"text"} 
					placeholder={"Name"} 
					maxLength={60}
					value={data.name} 
					onChange={(e) => {setData({ ...data, name: e.target.value})}} 
					error={dataError.name}
					onFocus={() => {
						setDataError({ ...dataError, name: false});
						setWarningText("");
					}}
				/>
				<div className="relative">
					<Input 
						type={"text"}
						placeholder={"Email"} 
						maxLength={68} 
						value={data.emailUpi} 
						onChange={(e) => {setData({ ...data, emailUpi: e.target.value})}} 
						error={dataError.emailUpi}
						onFocus={() => {
							setDataError({ ...dataError, emailUpi: false});
							setWarningText("");
						}}
					/>
					<div className="absolute right-0 top-0 h-full flex items-center">
						<div className={`${font.Satoshi_b2regular} text-white border-solid border-white border-l-[1px] pl-2 pr-4`}>@upi.edu</div>
					</div>
				</div>
				<div className="relative">
					<Input 
						type={showPassword ? "text" : "password"} 
						placeholder={"Password"} 
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
						placeholder={"Confirm password"} 
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
				<div className="w-full px-3 md:px-0 flex justify-between">
					<h6 className={`${font.Satoshi_b2regular} text-white`}>Gender</h6>
					<div className="flex gap-4">
						<div className="flex gap-2 items-center">
							<input 
								type="radio" 
								name="gender" 
								id="male" 
								className={styles.radio + " " + (dataError.gender ? styles.error : "")} 
								onClick={() => {
									setData({ ...data, gender: 1});
									setDataError({ ...dataError, gender: false});
									setWarningText("");
								}}
							/>
							<label htmlFor="male" className={`${font.Satoshi_b2regular} text-white`}>Male</label>
						</div>
						<div className="flex gap-2 items-center">
							<input 
								type="radio" 
								name="gender" 
								id="female" 
								className={styles.radio + " " + (dataError.gender ? styles.error : "")} 
								onClick={() => {
									setData({ ...data, gender: 2});
									setDataError({ ...dataError, gender: false});
									setWarningText("");
								}} 
							/>
							<label htmlFor="female" className={`${font.Satoshi_b2regular} text-white`}>Female</label>
						</div>
					</div>
				</div>
				{warningText && (
					<div className="w-auto max-w-[250px] md:max-w-[350px]">
						<p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
					</div>
				)}
				<div className="w-full px-3 md:px-0 flex gap-2 items-center">
					<input 
						type="checkbox" 
						id="tac" 
						className={styles.checkbox + " " + (dataError.tac ? styles.error : "")} 
						checked={data.tac}
						onChange={(e) => {
							setData({ ...data, tac: e.target.checked});
							setDataError({ ...dataError, tac: false});
							setWarningText("");
						}}
					/>
					<label htmlFor="tac" className={`${font.Satoshi_b2regular} text-white`}>I agree to the{" "}<Link target="_blank" href="/terms-and-conditions" className="text-cyan-500">terms and conditions</Link></label>
				</div>
				<div className="w-full px-2 py-1">
						<button 
							type="submit"
							disabled={loading}
							className={`${font.Satoshi_b2medium} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}
							onClick={async(e) => {
								e.preventDefault();

								setLoading(true);

								if (data.name === "") {
									setDataError({ ...dataError, name: true});
									setWarningText("Name can't be empty");

									setLoading(false);

									return;
								}

								if (!dataPattern.name.test(data.name)) {
									setDataError({ ...dataError, name: true});
									setWarningText("Input consists of alphabetic characters only, with words separated by a single space and no consecutive spaces.");

									setLoading(false);

									return;
								}

								if (data.emailUpi === "") {
									setDataError({ ...dataError, emailUpi: true});
									setWarningText("Email can't be empty");

									setLoading(false);

									return;
								}

								if (!dataPattern.emailUpi.test(data.emailUpi)) {
									setDataError({ ...dataError, emailUpi: true});
									setWarningText("Input should only contain alphanumeric characters, dots (.), underscores (_), percent (%), plus (+), or hyphens (-) without the domain (@upi.edu).");

									setLoading(false);

									return;
								}

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

								if (!dataPattern.password.test(data.password)) {
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

								if (data.gender === "") {
									setDataError({ ...dataError, gender: true});
									setWarningText("Sersow is only for normal person, so choose a gender");

									setLoading(false);

									return;
								}

								if (!data.tac) {
									setDataError({ ...dataError, tac: true});
									setWarningText("I know you won't read the Terms and Conditions, just check it");

									setLoading(false);

									return;
								}

								const res = await register(data.name, data.emailUpi + "@upi.edu", data.gender, data.password);

								if (res.status === "200") {
									setCookie("regAuth", res.data.token, {
										expires: new Date(new Date().getTime() + 10800000),
									});

									router.push("email-verification");
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
									setDataError({ ...dataError, emailUpi: true });
									setWarningText("Email already registered");
								}

								setLoading(false);
							}}
						>
							{loading ? <Loading type="points-opacity" size="lg" color="white" /> : "Register"}
						</button>
				</div>
				<div>
					<h4 className={`${font.Satoshi_b2regular} text-white`}>Already have an account ?{" "}<Link href="/login" className="text-cyan-500">Login</Link></h4>
				</div>
			</div>
		</form>
	);
}