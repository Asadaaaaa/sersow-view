import { FaCheck } from "react-icons/fa";

import font from '../font.module.css';

export default function ProgressTwo() {
	return (
		<div className="flex justify-center relative gap-24 md:gap-56">
			<div className="flex flex-col items-center gap-2 relative z-[3]">
				<div className="flex justify-center items-center w-12 h-12 md:w-20 md:h-20 bg-cyan-400 rounded-full shadow-[0px_0px_16px_rgba(34,211,238,0.4)]">
          <FaCheck className="text-slate-900 text-3xl" />
				</div>
				<div>
					<h5 className={`${font.Clash_display_h5medium} text-cyan-400 text-center`}>Step 1</h5>
					<h6 className={`${font.Satoshi_c2medium} text-cyan-400 text-center`}>Account Creation</h6>
				</div>
			</div>
			<div className="w-52 md:w-64 h-[26px] md:h-[42px] border-b-4 border-b-solid border-b-cyan-400 border-box absolute z-[2]">
			</div>
			<div className="flex flex-col items-center gap-2 relative z-[3]">
				<div className="flex justify-center items-center w-12 h-12 md:w-20 md:h-20 bg-cyan-400 rounded-full">
					<h2 className={`${font.Clash_display_h2medium} text-slate-700`}>2</h2>
				</div>
				<div>
					<h5 className={`${font.Clash_display_h5medium} text-white text-center`}>Step 2</h5>
					<h6 className={`${font.Satoshi_c2medium} text-white text-center`}>Email Verification</h6>
				</div>
			</div>
		</div>
	);
}