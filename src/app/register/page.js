import Form from './Form';
import ProgressOne from './ProgressOne';
import Header from '@/components/form/Header';
import BgGradient from '@/components/form/BgGradient';

export default function Register() {
  return (
		<main>
			<Header register={false} login={true} />
      <div className="bg-slate-950 relative overflow-hidden py-16 min-h-[calc(100vh-145.39px)]">
				<BgGradient />
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<ProgressOne />
					<Form />
				</div>
      </div>
    </main>
	);
}