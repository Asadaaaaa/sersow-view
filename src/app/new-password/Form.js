import Input from '../register/Input';
import font from '../font.module.css';

export default function Form () {
	return (
		<div className="bg-[rgba(2,6,23,0.5)] px-28 py-12 border-solid border-2 border-slate-700 rounded-[50px] backdrop-blur-[2px]">
			<div className="flex flex-col gap-12 items-center">
				<h1 className={`${font.Satoshi_h3bold} text-white`}>Set a new password</h1>
        <div className="flex flex-col gap-4 items-center w-[350px]">
          <h6 className={`${font.Satoshi_b2regular} text-white text-center`}>Your new password must be different from previous used pasword</h6>
          <Input placeholder={"New password"} type={"password"} />
          <Input placeholder={"Confirm a new password"} type={"password"} />
        </div>
        <div className="w-full px-2 py-1">
          <button className={`${font.Satoshi_b3bold} w-full px-6 py-3 text-center text-white rounded-xl bg-gradient-to-b from-cyan-500 to-blue-500 hover:drop-shadow-[0px_0px_4px_rgba(34,211,238,0.4)] transition-all`}>Reset Password</button>
        </div>
			</div>
		</div>
	);
}