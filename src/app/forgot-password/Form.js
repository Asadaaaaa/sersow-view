import Link from 'next/link';

import Input from '../register/Input';
import font from '../font.module.css';

export default function Form () {
	return (
		<div className="bg-[rgba(2,6,23,0.5)] px-28 py-12 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-12 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Forgot your password ?</h1>
        <div className="flex flex-col gap-4 items-center w-[350px]">
          <h6 className={`${font.Satoshi_b2regular} text-white text-center`}>Enter your email and we'll send you a link to get back into your account</h6>
          <Input placeholder={"Email"} type={"text"} />
        </div>
				<div className="flex flex-col gap-4 items-center w-full">
					<h4 className={`${font.Satoshi_b2regular} text-white`}>Didn't receive a link ?{" "}<span className="text-cyan-500">Resend</span></h4>
          <div className="w-full px-2 py-1">
            <button className={`${font.Satoshi_b3bold} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}>Verify email</button>
          </div>
          <Link href="/login">
            <h4 className={`${font.Satoshi_b2regular} text-cyan-500 text-center`}>I remember my password</h4>
          </Link>
        </div>
			</div>
		</div>
	);
}