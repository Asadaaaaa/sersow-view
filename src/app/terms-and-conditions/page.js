import font from "../font.module.css";
import TermCondition from "./TermCondition";
import CookiesPolicy from "./CookiesPolicy";
import Header from "../coming-soon/Header";
import Footer from "../Footer";
export default function TaC() {
  return (
   <main  className="bg-slate-900">
   <Header/>
    <p className={`${font.Clash_display_h1medium} text-white text-center mt-12`}>Terms and Conditions</p>
    <TermCondition/>
    <CookiesPolicy/>
    <Footer/>
   </main>
  );
}