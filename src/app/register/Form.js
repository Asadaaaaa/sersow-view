import Link from 'next/link';

import Input from './Input';
import font from '../font.module.css';

export default function Form () {
	return (
		<div className="bg-[rgba(2,6,23,0.5)] px-28 py-12 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-4 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Create new account</h1>
				<Input placeholder={"Name"} type={"text"} />
				<Input placeholder={"Username"} type={"text"} />
				<Input placeholder={"Email"} type={"text"} />
				<Input placeholder={"Password"} type={"password"} />
				<Input placeholder={"Confirm password"} type={"password"} />
				<div className="w-full flex justify-between">
					<h6 className={`${font.Satoshi_b2regular} text-white`}>Gender</h6>
					<div className="flex gap-4">
						<div className="flex gap-2 items-center">
							<input type="radio" name="gender" id="male" />
							<label htmlFor="male" className={`${font.Satoshi_b2regular} text-white`}>Male</label>
						</div>
						<div className="flex gap-2 items-center">
							<input type="radio" name="gender" id="female" />
							<label htmlFor="female" className={`${font.Satoshi_b2regular} text-white`}>Female</label>
						</div>
					</div>
				</div>
				<div className="w-full flex gap-2 items-center">
					<input type="checkbox" id="tac" />
					<label htmlFor="tac" className={`${font.Satoshi_b2regular} text-white`}>I agree to the{" "}<Link href="/terms-and-conditions" className="text-cyan-500">terms and conditions</Link></label>
				</div>
				<div className="w-full px-2 py-1">
					<Link href="/email-verification">
						<button className={`${font.Satoshi_b3bold} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}>Register</button>
					</Link>
				</div>
				<div>
					<h4 className={`${font.Satoshi_b2regular} text-white`}>Already have an account ?{" "}<Link href="/login" className="text-cyan-500">Login</Link></h4>
				</div>
			</div>
		</div>
	);
}