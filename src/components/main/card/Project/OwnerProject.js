import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import font from "@/app/font.module.css";
import { Popover } from "@nextui-org/react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";

import { OptionsCard } from "@/components/main/card/Project/projectOptionsCard";
import ListContributors from "@/components/main/card/Project/ListContributors";



export default function OwnerProject({ id, owner, title ,isMyProject, contributors=null}) {
  const [toogle, setToogle] = useState(false);
  const [isTridotsOpen, setIsTridotsOpen] = useState(false);
  let counter = 1;
  return (
    <div className="border-b border-slate-700 flex items-center justify-between pb-4">
      {
        contributors === null ? (
        <Link
          href={`/profile/${owner.username}`}
          className="flex items-center gap-4 "
        >
          <Image
            alt="Profile Image"
            src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + owner.image }
            width={120}
            height={120}
            className="rounded-full w-12 h-12 object-cover"
          />
          <div className="flex flex-col justify-center w-32 h-10">
            <h3 className={`${font.Satoshi_c2regular} text-white`}>
              {owner.nameSubstr}
            </h3>
            <p className={`${font.Satoshi_c1medium} text-slate-400`}>
              @{owner.username}
            </p>
          </div>
        </Link>
        ): (
          <>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setToogle(true)}>
            <div className={`flex -space-x-5 items-center`} >
              <Image
                alt="Profile Image"
                src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + owner.image }
                width={120}
                height={120}
                className="rounded-full w-12 h-12 object-cover z-10"
              />
              {
                contributors !== null ?(
                  contributors.map((item,index) => {
                    counter++;
                    if(index > 1) return;
                    
                    return(
                      <Image
                        alt="Profile Image"
                        src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + item }
                        width={120}
                        height={120}
                        className={`inline-block rounded-full w-${11 - index} h-${11 - index} object-cover z-[${index * 10}]`}
                      />
                    )
                  })
                ) : (<></>)
              }
         
            </div>
            <>
            {
              contributors.length > 2 && (
                <div className={`${font.Satoshi_c2medium} text-white`}>
                  +{contributors.length - 2}
                </div>
              )
            }
              <div className={`${font.Satoshi_c1medium} text-white ml-1`}>
                Multiple Creators
              </div>
            </>
          </div>
            {
            toogle && (
                <>
                <div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/90 border-solid border-slate-700 border-r-[1px]">
                  <div className="flex flex-col p-6 gap-4 bg-slate-900  rounded-xl border-slate-700 border-[1px]">
                    <div className="flex justify-between items-start pb-3 border-b-slate-700 border-b-2">
                        <div className={`${font.Satoshi_b2bold} text-white cursor-pointer`}>Project Contributors</div>
                        <div className="cursor-pointer pt-1" onClick={() => setToogle(false)}>
                          <FaTimes className="w-4 h-4 text-white" />
                        </div>
                    </div>
                      {
												<ListContributors projectId={id} click={() => setToogle(true)} />	
											}
                  </div>
                </div>
                </>
                )
            }
          </>
        )
      }
      
      <Popover isOpen={isTridotsOpen} onOpenChange={setIsTridotsOpen} placement="left-top" >
        <Popover.Trigger>
          <div className="cursor-pointer">
            <FaEllipsisH />
          </div>
        </Popover.Trigger>
        <Popover.Content css={{ overflow: "hidden" }}>
          <OptionsCard
            id={owner.id}
            username={owner.username}
            isMyProject={isMyProject}
            title={title}
            colaborator={contributors === null ? false : true}
            Click={() => {
              setToogle(true)
              setIsTridotsOpen(false)
            }}
          />
        </Popover.Content>
      </Popover>
    </div>
  );
}
