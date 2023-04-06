import Form from "./Form";
import Header from "../login/Header";

export default function ForgotPassword() {
  return (
    <main>
			<Header />
      <div className="bg-slate-950 relative overflow-hidden py-16">
				<div className="bg-gradient"></div>
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<Form />
				</div>
      </div>
    </main>
  );
}