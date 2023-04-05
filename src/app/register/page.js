import Header from './Header';
import StepOne from './StepOne';
import font from '../font.module.css';
import styles from '../globals.css';

export default function Register() {
  return (
		<main>
			<Header />
      <div className="bg-slate-950 relative h-screen overflow-hidden">
				<div className="bg-gradient"></div>
        <div className="flex flex-col items-center">
					<StepOne />
				</div>
      </div>
    </main>
	);
}