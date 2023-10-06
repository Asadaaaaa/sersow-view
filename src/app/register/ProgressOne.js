import font from '../font.module.css';

export default function ProgressOne() {
	return (
		<div className="flex justify-center relative gap-56">
			<div className="flex flex-col items-center gap-2 relative z-[3]">
				<div className="flex justify-center items-center w-20 h-20 bg-cyan-400 rounded-full shadow-[0px_0px_16px_rgba(34,211,238,0.4)]">
					<h2 className={`${font.Clash_display_h2medium} text-slate-900`}>1</h2>
				</div>
				<div>
					<h5 className={`${font.Clash_display_h5medium} text-white text-center`}>Step 1</h5>
					<h6 className={`${font.Satoshi_c2medium} text-white text-center`}>Account Creation</h6>
				</div>
			</div>
			<div className="w-64 h-[42px] border-b-4 border-b-solid border-b-cyan-400 border-box absolute z-[2]">
			</div>
			<div className="flex flex-col items-center gap-2 relative z-[3]">
				<div className="flex justify-center items-center w-20 h-20 bg-[#020b2b] border-4 border-solid border-cyan-400 border-box rounded-full">
					<h2 className={`${font.Clash_display_h2medium} text-slate-700`}>2</h2>
				</div>
				<div>
					<h5 className={`${font.Clash_display_h5medium} text-cyan-900 text-center`}>Step 2</h5>
					<h6 className={`${font.Satoshi_c2medium} text-cyan-900 text-center`}>Email Verification</h6>
				</div>
			</div>
		</div>
	);
}