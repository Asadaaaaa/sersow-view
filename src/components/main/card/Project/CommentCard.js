import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Popover } from '@nextui-org/react';
import {  FaEllipsisH, FaUserPlus, FaTrashAlt, FaFlag } from "react-icons/fa"

import font from '@/app/font.module.css';

export default function CommentCard ({data, index, click}){
  const [isTridotsOpen, setIsTridotsOpen] = useState(false);

  return(
      <div className="flex flex-col gap-2" key={index}>
        <div className="flex gap-4 items-start">
          <Image
              alt="Avatar User"
              className="mt-4 w-10 h-10 object-cover rounded-full "
              src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + data.image }
              width={220}
              height={220}
            />
          <div className="flex flex-col w-full p-4 gap-2 bg-slate-800 rounded-r-xl rounded-bl-xl">
            <div className="flex gap-2 items-start align-top">
              <Link href={`/profile/${data.username}`} >
                <h3 className={`${font.Satoshi_c1medium} text-white`}>{data.name}</h3>
                <p className={`${font.Satoshi_c1medium} text-slate-400`}>@{data.username}</p>
              </Link>
              <h3 className={`${font.Satoshi_c1medium} text-slate-500`}>
                {
                  data.gender === 1 ? (
                    "(He/him)"
                  ) : data.gender === 2 ? (
                    "(She/her)"
                  ) : ("")
                }
              </h3>
              {
                <Popover isOpen={isTridotsOpen} onOpenChange={setIsTridotsOpen} placement="left-top" >
                <Popover.Trigger>
                  <div className="cursor-pointer ml-auto">
                    <FaEllipsisH className="fill-white" />
                  </div>
                </Popover.Trigger>
                <Popover.Content css={{ overflow: "hidden" }}>
                  <div className="flex flex-col w-72 p-4 gap-2 bg-slate-900">
                    <div className="flex justify-between text-white">
                      <p className={`${font.Satoshi_b2bold} text-white `}>Comment</p>
                    </div>
                    <div className="flex flex-col p-0 text-slate-400  border-t-slate-400 border-t-[1px]">
                      {data.isMyComment ? (
                        <div	className="flex items-center gap gap-2 py-2 px-4 cursor-pointer" 
                              onClick={ () => {
                                setIsTridotsOpen(false)
                                click();
                              }
                            }>
                          <FaTrashAlt className="w-5 h-4" />
                          <p>Delete comment</p>
                        </div>
                      ) : (
                        <Link
                          href={`/profile/${data.username}`}
                          className="flex items-center gap gap-2 py-2 px-4 cursor-pointer"
                        >
                          <FaUserPlus className="w-5 h-4 " />
                          <p>@{data.username}</p>
                        </Link>
                      )
                      }
                    </div>
                  </div>
                </Popover.Content>
              </Popover>
              }
            </div>
            <p className={`${font.Satoshi_c1medium} text-slate-200`}>{data.comment}</p>
          </div>
        </div>
      </div>
  )
}