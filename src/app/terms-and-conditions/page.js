import font from '../font.module.css';
import CookiesPolicy from './CookiesPolicy';
import TermsConditions from './TermsConditions';
import Header from '@/components/static/Header';
import Footer from '@/components/static/Footer';

export default function TaC() {
  return (
    <main  className="bg-slate-900">
      <Header />
      <p className={`${font.Clash_display_h1medium} text-white text-center mt-12`}>Terms and Conditions</p>
      <TermsConditions />
      <CookiesPolicy />
      <Footer transparent={false} />
    </main>
  );
}