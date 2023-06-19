import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";

import Like from "@/api/activity/project/like";
import Unlike from "@/api/activity/project/unlike";
import { IsLogin } from "@/components/main/LoginContext";
import Link from "next/link";

export default function InteractionProjcet({ id, isLiked}) {

  const router = useRouter();
  const { isLogin } = useContext(IsLogin);
  const [isLikedProject, setIsLikedProject] = useState(isLiked);

  async function like(projectId) {
    if (isLogin) {
      setIsLikedProject(!isLikedProject);
    }
    const res = await Like(projectId, getCookie("auth"));
    if(res){
      if (res.status === "200") {
      } else if (res.status === "unauth") {
        router.push("login");
      }
    }
  }

  async function unlike(projectId) {
    if (isLogin) {
      setIsLikedProject(!isLikedProject)
    }
    const res = await Unlike(projectId, getCookie("auth"));
    if(res){
      if (res.status === "200") {
      } else if (res.status === "unauth") {
        router.push("login");
      }
    }
  }

  const copylinkProject = (id) => {
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
      `https://stg.sersow.otech.id/project/${id}`
    );
  };

  return (
    <div className="flex mt-12 bg-slate-800 rounded-xl py-2 justify-evenly">
      
      <div className="px-10 border-r border-slate-600 group cursor-pointer " >
      {isLikedProject ? (
          <FaHeart className="fill-pink-600" onClick={async() => await unlike(id)} />
        ) : (
          <FaHeart className="stroke-white" onClick={async() => await like(id)}/>
        )
      }
      </div>
      <Link href={`/project/${ id }#comment`} scroll={false}>
      <div className="px-10 border-r border-slate-600 group cursor-pointer">
        <FaComment className="stroke-white group-hover:fill-cyan-400" />
      </div>
      </Link>
      <div className="px-10 cursor-pointer "
        onClick={() => copylinkProject(id)}
      >
        <FaShare className="hover:fill-green-400" />
      </div>
    </div>
  );
}
