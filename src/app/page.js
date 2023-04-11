import Faqs from "./Faqs";
import Join from "./Join";
import Main from "./Main";
import Quote from "./Quote";
import Header from "./Header";
import Footer from "./Footer";
import Credits from "./Credits";
import Featured from "./Featured";
import Discover from "./Discover";
import TechStack from "./TechStack";

export default function Home() {
  return (
    <main className="bg-slate-950">
      <Header />
      <Main />
      <Featured />
      <Discover />
      <Join />
      <Quote />
      <TechStack />
      <Credits />
      <Faqs />
      <Footer />
    </main>
  );
}
