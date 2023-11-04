import Form from './Form';
import Header from '@/components/form/Header';
import BgGradient from '@/components/form/BgGradient';

export default function Login() {
  return (
		<main>
			<Header register={true} login={false} />
      <div className="bg-slate-950 relative overflow-hidden py-28 min-h-[calc(100vh-98.19px)] md:min-h-[calc(100vh-103.39px)]">
				<BgGradient />
        <div className="flex flex-col gap-16 items-center relative z-[2]">
					<Form />
				</div>
      </div>
    </main>
	);
}