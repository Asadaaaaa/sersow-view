import Link from "next/link";
import Image from "next/image";
import font from "@/app/font.module.css";
import { Popover } from "@nextui-org/react";
import { FaEllipsisH } from "react-icons/fa";

import { OptionsCard } from "@/components/main/discover/projectOptionsCard";


export default function OwnerProject({ id, owner_username, owner_image, owner_name, title ,isMyProject}) {
  return (
    <div className="border-b border-slate-700 flex items-center justify-between pb-4">
      <Link
        href={`/profile/${owner_username}`}
        className="flex items-center gap-4 "
      >
        <Image
          src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + owner_image }
          width={120}
          height={120}
          className="rounded-full w-12 h-12 object-cover"
        />
        <div className="flex flex-col justify-center w-32 h-10">
          <h3 className={`${font.Satoshi_c2regular} text-white`}>
            {owner_name}
          </h3>
          <p className={`${font.Satoshi_c1medium} text-slate-400`}>
            @{owner_username}
          </p>
        </div>
      </Link>
      <Popover placement="left-top">
        <Popover.Trigger>
          <div className="cursor-pointer">
            <FaEllipsisH />
          </div>
        </Popover.Trigger>
        <Popover.Content css={{ overflow: "hidden" }}>
          <OptionsCard
            id={id}
            username={owner_username}
            isMyProject={isMyProject}
            title={title}
          />
        </Popover.Content>
      </Popover>
    </div>
  );
}
