import Image from 'next/image';

import '../app/globals.css';
import font from '../app/font.module.css';
import Header from '@/components/static/Header';
import Footer from '@/components/static/Footer';
import IconNol from '../../public/images/ServerError/ServerErrorComponent1.svg';
import LGradient from '../../public/images/NotFound/NotFoundGradient1.svg';
import RGradient from '../../public/images/NotFound/NotFoundGradient2.svg';

export default function ServerError() {
	return (
	<main>
		<Header />
			<div>
				<div className="bg-slate-950 flex -mb-[130.91px] min-h-[860px] md:min-h-[960px] xl:min-h-[calc(100vh-220.3px)]">
					<div className="relative w-full mb-4">
						<Image src={RGradient} className="mix-blend-plus-lighter float-left w-56 md:w-[24rem] xl:w-auto rotate-180 scale-y-[-1]" />	
						<Image src={LGradient} className="mix-blend-hard-light float-right z-[-1] w-72 sm:w-[24rem] xl:w-auto rotate-180 scale-y-[-1]" />   
					</div>
					<div className="absolute w-full py-24 mt-2">
						<div className="flex flex-col gap-y-16 -gap-x-8  items-center z-[2]">
						<h1 className={`${font.Clash_display_d1bold} text-white flex items-center text-center pl-20`}><span className='text-cyan-500 absolute -translate-x-12 md:-translate-x-20 rotate-[-15deg]'>5</span> <Image src={IconNol} className="h-64 md:h-full"/> <Image className='h-64 md:h-full -ml-16' src={IconNol}/> </h1>
						<div className="flex flex-col gap-4 item-center relative z-[3]">
							<h2 className={`${font.Clash_display_h1medium} text-center text-white`}>You have just arrived in uncharted space</h2>
							<p className={`${font.Clash_display_h5medium} text-center text-gray-500`}>A glitch in the matrix disrupts the connection.</p>
						</div>
						<button className="respawnBtn flex items-center gap-8 px-8 py-4 border-[1px] border-solid border-slate-300 rounded-xl transition ease-out delay-150 hover:shadow-[0_0_4px_1px_white] hover:shadow-inner-[0_0_3px_1px_rgb(255,255,255,0.4)] active:scale-[.92] active:delay-150">
							<h5 className={`${font.Clash_display_h5medium} text-white`}>Respawn here</h5>
						</button>
						</div>
					</div>  
				</div>
				<Footer transparent={true} />
			</div>
		</main>
	)
}