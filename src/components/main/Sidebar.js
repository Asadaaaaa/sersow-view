import Link from "next/link";
import Image from "next/image";
import { FaHome, FaHashtag, FaUser, FaCog, FaRocket, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

import font from "../../app/font.module.css";
import LogoTitle from "../../../public/images/LogoTitle.svg";
import Mikakitchen from "../../../public/images/Mikakitchen.png";

export default function Sidebar({ isLogin, page }) {

  const pages = [
    {
      icon: <FaHome className="w-6 h-6" />,
      text: "Home",
      isLogin: false,
    },
    {
      icon: <FaHashtag className="w-6 h-6" />,
      text: "Discover",
      isLogin: false,
    },
    {
      icon: <FaUser className="w-6 h-6" />,
      text: "Profile",
      isLogin: true,
    },
    {
      icon: <FaCog className="w-6 h-6" />,
      text: "Settings",
      isLogin: true,
    },
  ]

  const filteredPages = pages.filter((page) => {
    if (isLogin) {
      return page;
    } else {
      return page.isLogin === isLogin;
    }
  });

  return (
    <div className="h-screen flex flex-col justify-between py-6 px-12 bg-slate-900 border-solid border-slate-700 border-r-[1px]">
      <div className="flex flex-col gap-12">
        <div>
          <Image src={LogoTitle} alt="Sersow Logo" className="w-[280px] h-auto" priority={true} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {filteredPages.map((item) => (
              <Link href={item.text.toLowerCase()} key={item.text + " page"}>
                <div className={"flex items-center gap-2 px-6 py-3 select-none rounded-full transition-all " + (page === item.text ? "text-cyan-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800")}>
                  <div>
                    {item.icon}
                  </div>
                  <span className={`${font.Satoshi_h6bold}`}>{item.text}</span>
                </div>
              </Link>
            ))}
          </div>
          {
            isLogin && (
              <div>
                <button className="flex justify-center items-center gap-2 px-[45.5px] py-4 text-white rounded-xl bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9] transition ease-out delay-100 hover:to-[#22D3EE] hover:shadow-[0px_0px_12px_.5px_#22d3ee] active:shadow-[0_0_0_0] active:scale-[.92] active:from-[rgb(6 182 212)] active:to-[rgb(6 182 212)]">
                  <div>
                    <FaRocket className="w-5 h-5" />
                  </div>
                  <span className={`${font.Satoshi_h6bold}`}>Publish Project</span>
                </button>
              </div>
            )
          }
        </div>
      </div>
      <div>
        {
          isLogin ? (
            <div className="flex justify-between items-center pt-5 pb-1 border-solid border-slate-700 border-t-[1px]">
              <div className="flex items-center gap-2">
                <Image src={Mikakitchen} alt="Sersow Profile Picture" className="w-9 h-9 rounded-full " />
                <div className="flex flex-col text-slate-300">
                  <h4 className={`${font.Satoshi_c1bold}`}>Asede Mikakitchen</h4>
                  <h5 className={`${font.Satoshi_c2regular}`}>@asadaaaaa</h5>
                </div>
              </div>
              <button className="py-3 px-6 rounded-xl bg-gradient-to-b from-purple-500 to to-violet-600 hover:drop-shadow-[0px_0px_4px_rgba(168,85,247,0.4)] transition-all">
                <FaSignOutAlt className="w-5 h-5 text-white" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center pb-3 border-solid border-slate-700 border-b-[1px]">
                <h3 className={`${font.Satoshi_h6medium} text-white`}>You are currently a guest</h3>
                <h5 className={`${font.Satoshi_c2medium} text-slate-400`}>Your access is limited</h5>
              </div>
              <div className="flex flex-col gap-4 py-1 px-2">
                <Link href={"register"}>
                  <button className={`${font.Satoshi_b2bold} text-white w-full py-3 rounded-xl bg-gradient-to-b from-purple-500 to to-violet-600 hover:drop-shadow-[0px_0px_4px_rgba(168,85,247,0.4)] transition-all`}>Register</button>
                </Link>
                <Link href={"login"}>
                  <button className={`${font.Satoshi_b2bold} text-white w-full py-3 flex justify-center items-center gap-2 rounded-xl border-[1px] border-solid border-slate-400`}>
                    <div>
                      <FaSignInAlt className="w-5 h-5" />
                    </div>
                    <h4 className={`${font.Satoshi_b2bold}`}>Log in</h4>
                  </button>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}