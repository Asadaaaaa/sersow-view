import Image from "next/image";
import { FaTimes } from 'react-icons/fa';
import { useState, useEffect } from "react";

import font from '@/app/font.module.css';

export default function ThumbnailProject({thumbnail}) {
  const [nsfwWarning, setNsfwWarning] = useState(false);

  useEffect(() => {
    if (thumbnail) {
      setNsfwWarning(thumbnail.flagged_nsfw);
    }
  }, [thumbnail])

  return (
    <div>
      {thumbnail !== null ? (
        <div className={"flex justify-center items-center relative " + (nsfwWarning ? "min-h-[195.6px]" : "")}>
          <Image
            alt="Thumbnail Project"
            src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + thumbnail["data"] }
            width={1020}
            height={1020}
            className="h-auto w-80 object-cover "
          />
          {
            nsfwWarning && (
              <div className="absolute top-0 left-0 z-10 w-full h-full p-4 flex justify-center items-center bg-slate-950/95 border-solid border-slate-700">
                <div className="flex flex-col p-6 gap-4 bg-slate-900  rounded-xl border-slate-700 border-[1px]">
                  <div className="flex justify-between items-start pb-3 border-b-slate-700 border-b-2 gap-3">
                    <div className={`${font.Satoshi_b2bold} text-white`}>NSFW Warning by Fluxync</div>
                    <div className="cursor-pointer pt-1" onClick={() => setNsfwWarning(false)}>
                      <FaTimes className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className={`${font.Satoshi_c2medium} text-white`}>This project contains NSFW content.</div>
                    <div className={`${font.Satoshi_c2medium} text-white`}>Please be aware that the content may not be suitable for all audiences.</div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      ) : (null)}
    </div>
  );
}
