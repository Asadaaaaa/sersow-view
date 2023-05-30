import Form from './Form';
import Header from './Header';
import ProgressOne from './ProgressOne';

export default function Register() {
  return (
		<main>
			<Header />
      <div className="bg-slate-950 relative overflow-hidden py-16 min-h-[calc(100vh-145.39px)]">
				<div className="bg-gradient"></div>
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<ProgressOne />
					<Form />
				</div>
      </div>
    </main>
	);
}