import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUserCog, FaCogs, FaBell } from 'react-icons/fa';

import font from '@/app/font.module.css';

export default function SettingsToggleFilter() {

  const pathname = usePathname();
  const path = pathname.split("/")[2];

  const navbarMenu = [
    {
      menu: "Profile",
      icon: <FaUserCog className="w-5 h-5" />,
      value: 0,
    },
    {
      menu: "Account",
      icon: <FaCogs className="w-5 h-5" />,
      value: 1,
    },
    // {
    //   menu: "Notifications",
    //   icon: <FaBell className="w-5 h-5" />,
    //   value: 2,
    // },
  ]

  return (
    <div className="flex items-center gap-2 px-2 border-solid border-slate-700 border-x-[1px]">
      {navbarMenu.map((item, index) => (
        <div key={item.value} className={index !== navbarMenu.length-1 ? "pr-2 border-slate-700 border-r-[1px]" : ""}>
          <Link href={"settings/" + item.menu.toLowerCase()}>
            <div
              className={`${font.Satoshi_b2bold} py-1 px-2 cursor-pointer select-none rounded-full transition-all ` + (item.menu.toLowerCase() === path ? "text-cyan-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800")}
            >
              <div className="flex justify-center gap-2 py-2 px-4">
                <div>{item.icon}</div>
                <h5>{item.menu}</h5>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}