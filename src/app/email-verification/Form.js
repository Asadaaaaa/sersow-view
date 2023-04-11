import Input from '../register/Input';
import font from '../font.module.css';

export default function Form () {
	return (
		<div className="bg-[rgba(2,6,23,0.5)] px-28 py-24 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-4 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Email Verification</h1>
				<h6 className={`${font.Satoshi_b2regular} text-white`}>Open your email and find the verification code</h6>
				<Input placeholder={"Verification code"} type={"text"} />
				<div>
					<h4 className={`${font.Satoshi_b2regular} text-white`}>Didn't receive a code ?{" "}<span className="text-cyan-500">Resend</span></h4>
				</div>
				<div className="w-full px-2 py-1">
					<button className={`${font.Satoshi_b3bold} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}>Verify email</button>
				</div>
			</div>
		</div>
	);
}