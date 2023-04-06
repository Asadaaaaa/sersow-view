import Form from './Form';
import Header from './Header';

export default function Login() {
  return (
		<main>
			<Header />
      <div className="bg-slate-950 relative overflow-hidden py-28">
				<div className="bg-gradient"></div>
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<Form />
				</div>
      </div>
    </main>
	);
}