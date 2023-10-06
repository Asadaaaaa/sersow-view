import React from "react";
import { toast } from "react-toastify";
import { FaUserPlus, FaLink, FaEdit, FaUsers } from "react-icons/fa";

import font from "@/app/font.module.css";
import Link from "next/link";

export const OptionsCard = ({ id, username,title ,isMyProject, colaborator=false , Click}) => {
  const copylink = () => {
    toast.success("Link Copied!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigator.clipboard.writeText(
      `https://beta.sersow.otech.id/profile/${username}`
    );
  };
  return (
    <div className="flex flex-col w-72 p-4 gap-2 bg-slate-900 ">
      <div className="flex justify-between text-white">
        <p className={`${font.Satoshi_b2bold} text-white `}>{title}</p>
      </div>
      <div className="flex flex-col p-0 text-slate-400  border-t-slate-400 border-t-[1px]">
        {isMyProject ? (
          <Link
            href={`/project/${id}`}
            className="flex items-center gap gap-2 py-2 px-4 cursor-pointer"
          >
            <FaEdit className="w-5 h-4 " />
            <p>Edit project</p>
          </Link>
        ) : (
          <Link
            href={`/profile/${username}`}
            className="flex items-center gap gap-2 py-2 px-4 cursor-pointer"
          >
            <FaUserPlus className="w-5 h-4 " />
            <p>@{username}</p>
          </Link>
        )}
        <div className="flex items-center gap gap-2 py-2 px-4 cursor-pointer" onClick={copylink} >
          <FaLink className="w-5 h-4" />
          <p> Copy profile link</p>
        </div>
        {
          colaborator && (
            <div className="flex items-center gap gap-2 py-2 px-4 cursor-pointer" onClick={Click} >
              <FaUsers className="w-5 h-4" />
              <p> See contributors</p>
            </div>
          )
        }
      </div>
    </div>
  );
};
