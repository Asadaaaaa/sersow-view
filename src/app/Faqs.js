"use client"

import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

import font from "./font.module.css";

export default function Faqs() {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const content = [
    {
      title: "What is Sersow?",
      desc: "Sersow is a platform for students and entities with the Universitas Pendidikan Indonesia to showcase their projects while aiming to improve accessibility to information about projects within the university community.",
    }, 
    {
      title: "How does it work?",
      desc: "Sersow user also known as a creator can publish their project and tag other creator whilte the non-creator or guest could only browse through a variety of projects across the platform.",
    }, 
    {
      title: "It is free to use?",
      desc: "Yes, it is completely free to access and utilize",
    },
    {
      title: "And many more will be added",
      desc: "Ask now your question will be added to this section",
    },
  ]

  return (
    <div className="p-24" id="faqs">
      <h4 className={`${font.Clash_display_d4bold} text-white text-center mb-12`}>FAQS</h4>
      <div>
        {content.map((item, index) => (
          <div key={index}>
            <div className="w-full flex justify-between items-center px-8 py-4">
              <h2 className={`${font.Clash_display_h2medium} text-white`}>{item.title}</h2>
              <div onClick={() => handleClick(index)}>
                <FaChevronLeft color="white" className={"w-6 h-6 transition-all " + (activeIndex === index ? "-rotate-90" : "")} />
              </div>
            </div>
            {activeIndex === index && (
              <div className={`${font.Satoshi_b1regular} text-slate-400 px-8 pb-8 select-none`}>
                {item.desc}
              </div>
            )}
            <hr />
          </div>
        ))}
        {/* <div className="w-full flex justify-between items-center px-8 py-4">
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
        <hr /> */}
      </div>
    </div>
  );
}