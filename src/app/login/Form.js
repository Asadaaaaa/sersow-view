import Link from 'next/link';

import Input from '../register/Input';
import font from '../font.module.css';

export default function Form () {
	return (
		<div className="bg-[rgba(2,6,23,0.5)] px-28 py-12 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-4 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Login</h1>
				<Input placeholder={"Username or email"} type={"text"} />
				<Input placeholder={"Password"} type={"password"} />
				<div className="w-full mb-6">
					<Link href="/forgot-password">
						<h4 className={`${font.Satoshi_b2regular} text-cyan-500 text-right`}>Forgot your password ?</h4>
					</Link>
				</div>
				<div className="w-full px-2 py-1">
					<button className={`${font.Satoshi_b3bold} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}>Login</button>
				</div>
				<div>
					<h4 className={`${font.Satoshi_b2regular} text-white`}>Don't have an account ?{" "}<Link href="/register" className="text-cyan-500">Register</Link></h4>
				</div>
			</div>
		</div>
	);
}