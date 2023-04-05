import Header from './Header';
import font from '../font.module.css';
import styles from '../globals.css';

export default function Register() {
  return (
		<main>
			<Header />
      <div className="bg-slate-950 relative h-screen">
				<div className="bg-gradient"></div>
        <h1 className={`${font.Clash_display_d6bold} text-red-500`}>Register Page Sersow</h1>
      </div>
    </main>
	);
}