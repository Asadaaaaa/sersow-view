import Link from "next/link";
import Image from "next/image";

import font from "@/app/font.module.css";


export default function Avatar({username, name, image}) {
  return (
    <Link
      href={`/profile/${username}`}
      className="flex items-center gap-2"
    >
      <Image
        alt="Avatar User"
        className="w-12 h-12 object-cover rounded-full "
        src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + image }
        width={220}
        height={220}
      />
      <div className="flex flex-col justify-center w-32 h-10">
        <h3 className={`${font.Satoshi_c2regular} text-white`}>{name}</h3>
        <p className={`${font.Satoshi_c1medium} text-slate-400`}>@{username}</p>
      </div>
    </Link>
  );
}
