import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { Loading } from "@nextui-org/react";
import { Popover } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { FaEllipsisH, FaHeart, FaComment, FaShare } from "react-icons/fa";

import font from "@/app/font.module.css";
import Like from "@/api/activity/project/like";
import Unlike from "@/api/activity/project/unlike";
import getCollabProject from "@/api/project/collabproject";
import { IsLogin } from "@/components/main/LoginContext";
import styles from "@/components/main/discover/discover.module.css";
import { OptionsCard } from "@/components/main/discover/projectOptionsCard";

export default function Collabs({ userId }) {
  const router = useRouter();

  const { isLogin } = useContext(IsLogin);

  const [dataProject, setdataProject] = useState([]);

  async function like(projectId) {
    if (isLogin) {
      setdataProject(
        dataProject.map((item) =>
          item.id === projectId ? { ...item, isLiked: true } : item
        )
      );
    }
    const res = await Like(projectId, getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        return res;
      } else if (res.status === "unauth") {
        router.push("login");
      }
    }
  }

  async function unlike(projectId) {
    if (isLogin) {
      setdataProject(
        dataProject.map((item) =>
          item.id === projectId ? { ...item, isLiked: false } : item
        )
      );
    }
    const res = await Unlike(projectId, getCookie("auth"));
    if (res) {
      if (res.status === "200") {
        return res;
      } else if (res.status === "unauth") {
        router.push("login");
      }
    }
  }

  const copylink = (username) => {
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
      `https://stg.sersow.otech.id/profile/${username}`
    );
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getCollabProject(userId, getCookie("auth"));

      if (res) {
        if (res.status === "200") {
          setdataProject(res.data);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center px-12 gap-12 text-white">
      <div className="flex flex-col w-full h-full gap-6 ">
        {dataProject ? (
          <div className="flex flex-wrap gap-6 items-start">
            {dataProject.map((item, index) => {
              return (
                <div className="p-6 bg-slate-900 rounded-lg w-96" key={index}>
                  <div className="border-b border-slate-700 flex items-center justify-between pb-4">
                    <Link
                      href={`/profile/${item.owner_username}`}
                      className="flex items-center gap-2 "
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_HOST +
                          "/" +
                          process.env.NEXT_PUBLIC_VERSION +
                          item.owner_image
                        }
                        width={120}
                        height={120}
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <p className={`${font.Satoshi_c2medium}`}>
                        @{item.owner_username}
                      </p>
                    </Link>
                    <Popover placement="left-top">
                      <Popover.Trigger>
                        <div className="cursor-pointer">
                          <FaEllipsisH />
                        </div>
                      </Popover.Trigger>
                      <Popover.Content css={{ overflow: "hidden" }}>
                        <OptionsCard
                          id={item.id}
                          username={item.owner_username}
                          isMyProject={item.isMyProject}
                          title={item.title}
                        />
                      </Popover.Content>
                    </Popover>
                  </div>

                  <Link
                    href={`/project/${item.id}`}
                    className="flex items-center my-4 gap-2"
                  >
                    {item.logo !== null ? (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_HOST +
                          "/" +
                          process.env.NEXT_PUBLIC_VERSION +
                          item.logo
                        }
                        width={220}
                        height={220}
                        className="w-11 h-11 object-cover rounded-full"
                      />
                    ) : (
                      <></>
                    )}
                    <p className={`${font.Satoshi_h5bold}`}>{item.title}</p>
                  </Link>

                  {item.categories[0] !== null ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {item["categories"].map((item) => (
                        <div
                          className={` ${font.Satoshi_c3bold} flex justify-center w-20 rounded-full border border-slate-500 py-1 px-2`}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="my-4 text-justify">
                    <p className={`${font.Satoshi_c2medium}`}>
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {item.thumbnail !== null ? (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_HOST +
                          "/" +
                          process.env.NEXT_PUBLIC_VERSION +
                          item.thumbnail["data"]
                        }
                        width={1020}
                        height={1020}
                        className="h-40 w-80 object-cover"
                      />
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex mt-12 bg-slate-800 rounded-xl py-2 justify-evenly">
                    {item.isLiked ? (
                      <div
                        className="px-10 border-r border-slate-600 group cursor-pointer "
                        onClick={() => unlike(item.id)}
                      >
                        <FaHeart className="fill-pink-600 hover:fill-white" />
                      </div>
                    ) : (
                      <div
                        className="px-10 border-r border-slate-600 group cursor-pointer "
                        onClick={() => like(item.id)}
                      >
                        <FaHeart className="stroke-white group-hover:fill-pink-600" />
                      </div>
                    )}

                    <div className="px-10 border-r border-slate-600 group cursor-pointer">
                      <FaComment className="stroke-white group-hover:fill-cyan-400" />
                    </div>
                    <div
                      className="px-10 cursor-pointer "
                      onClick={() => copylink(item.owner_username)}
                    >
                      <FaShare className="hover:fill-green-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="pt-12 flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
