import { FaChevronLeft } from "react-icons/fa";

import font from "./font.module.css";

export default function Faqs() {
  return (
    <div className="p-24" id="faqs">
      <h4 className={`${font.Clash_display_d4bold} text-white text-center mb-12`}>FAQS</h4>
      <div>
        <div className="w-full flex justify-between items-center px-8 py-4">
          <h2 className={`${font.Clash_display_h2medium} text-white`}>What is Sersow?</h2>
          <div>
            <FaChevronLeft color="white" className="w-6 h-6" />
          </div>
        </div>
        <hr />
        <div className="w-full flex justify-between items-center px-8 py-4">
          <h2 className={`${font.Clash_display_h2medium} text-white`}>How does it work?</h2>
          <div>
            <FaChevronLeft color="white" className="w-6 h-6" />
          </div>
        </div>
        <hr />
        <div className="w-full flex justify-between items-center px-8 py-4">
          <h2 className={`${font.Clash_display_h2medium} text-white`}>Is it free to use?</h2>
          <div>
            <FaChevronLeft color="white" className="w-6 h-6" />
          </div>
        </div>
        <hr />
        <div className="w-full flex justify-between items-center px-8 py-4">
          <h2 className={`${font.Clash_display_h2medium} text-white`}>And many more will be added</h2>
          <div>
            <FaChevronLeft color="white" className="w-6 h-6" />
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}