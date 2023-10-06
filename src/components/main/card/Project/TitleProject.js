import Link from "next/link";
import Image from "next/image";
import font from "@/app/font.module.css";

export default function TitleProject({ id, logo, title}) {
  return (
    <Link href={`/project/${id}`} className="flex items-center my-4 gap-2">
      {logo !== null ? (
        <Image
          alt="Logo Project"
          src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + logo }
          width={220}
          height={220}
          className="w-11 h-11 object-cover rounded-full"
        />
      ) : (null)}
      <p className={`${font.Satoshi_h5bold}`}>{title}</p>
    </Link>
  );
}
