import Form from "./Form";
import Header from "../register/Header";
import ProgressTwo from "./ProgressTwo";

export default function EmailVerification() {
  return (
    <main>
			<Header />
      <div className="bg-slate-950 relative overflow-hidden py-16">
				<div className="bg-gradient"></div>
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<ProgressTwo />
					<Form />
				</div>
      </div>
    </main>
  );
}