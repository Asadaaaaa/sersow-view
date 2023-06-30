"use client";

import { useState } from 'react';
import { FaFolderOpen, FaCheck, FaTimes } from 'react-icons/fa';

import font from '@/app/font.module.css';

export default function FileContainer({ children, status, subtitle, clickHandler, fileName, isWithLink, value, onChange }) {

  const [isText, setIsText] = useState(false);

  return (
    <div className={"group flex flex-col gap-3 border-dashed border-2 rounded-xl p-6 cursor-pointer " + (status === "success" ? "border-green-600 hover:border-green-400" : status === "error" ? "border-rose-700 hover:border-rose-500" : "border-slate-600 hover:border-slate-400")}>
      <div 
        className="flex flex-col gap-4 items-center"
        onClick={clickHandler}
      >
        {
          status === "ready" && (
            <>
              {
                !value && (
                  <>
                    <div>
                      <FaFolderOpen className="w-8 h-8 text-slate-600 group-hover:text-slate-400" />
                    </div>
                    <div className="text-center">
                      <h1 className={`${font.Satoshi_c2bold} text-white`}>Click to Upload Your File Here</h1>
                      {
                        subtitle && (
                          <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>{subtitle}</h4>
                        )
                      }
                    </div>
                    {
                      isWithLink && (
                        <div className="w-full relative h-4 flex items-center justify-center">
                          <hr className="w-full border-slate-700" />
                          <div className={`${font.Satoshi_c2bold} absolute top-0 text-slate-700 bg-slate-900 px-2`}>Or</div>
                        </div>
                      )
                    }
                  </>
                )
              }
            </>
          )
        }
        {
          status === "success" && (
            <>
              <div>
                <FaCheck className="w-8 h-8 text-green-600 group-hover:text-green-400" />
              </div>
              <div className="text-center">
                <h1 className={`${font.Satoshi_c2bold} text-white`}>File has been added!</h1>
                {
                  fileName && (
                    <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>{fileName}</h4>
                  )
                }
              </div>
              <hr className="w-full border-slate-700" />
            </>
          )
        }
        {
          status === "error" && (
            <>
              <div>
                <FaTimes className="w-8 h-8 text-rose-700 group-hover:text-rose-500" />
              </div>
              <div className="text-center">
                <h1 className={`${font.Satoshi_c2bold} text-white`}>Something when wrong</h1>
                {
                  <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>You could upload your file again</h4>
                }
              </div>
            </>
          )
        }
      </div>
      {
        (isWithLink && status === "ready") && (
          <div className="flex flex-col gap-4 items-center w-full">
            <h1 className={`${font.Satoshi_c2bold} text-white`}>Paste link to your program</h1>
            <input 
              spellCheck={"false"}
              className={`${font.Satoshi_c1regular} w-full py-3 px-6 border-solid text-white border-[1px] bg-transparent outline-none focus:border-white rounded-lg border-slate-700 hover:border-slate-500`} 
              type={"text"} 
              placeholder={"https://example.com/file"}
              value={value}
              onChange={onChange}
            />
          </div>
        )
      }
      {
        children && (
          <div className="flex justify-center">
            {children}
          </div>
        )
      }
    </div>
  );
}