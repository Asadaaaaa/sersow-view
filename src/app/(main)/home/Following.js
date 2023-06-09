import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Popover } from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";

import font from "@/app/font.module.css";
import getFollowing from "@/api/project/following";
import Like from "@/api/activity/project/like";
import Unlike from "@/api/activity/project/unlike";
import { IsLogin } from "@/components/main/LoginContext";
import { OptionsCard } from "@/components/main/home/projectOptionsCard";

import { FaEllipsisH, FaHeart, FaComment, FaShare } from "react-icons/fa";

export default function Following() {
  const router = useRouter();

  const [dataProject, setdataProject] = useState([]);
  const [dataProjectOdd, setdataProjectOdd] = useState([]);
  const [dataProjectEven, setdataProjectEven] = useState([]);
  const { isLogin } = useContext(IsLogin);

  async function like(projectId) {
    if (isLogin) {
      setdataProject(
        dataProject.map((item) =>
          item.id === projectId ? { ...item, isLiked: true } : item
        )
      );
    }

    const res = await Like(projectId, getCookie("auth"));
    if (res.status === "200") {
    } else if (res.status === "unauth") {
      router.push("login");
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
    if (res.status === "200") {
    } else if (res.status === "unauth") {
      router.push("login");
    }
  }

  const copylink = (id) => {
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

  useEffect(() => {
    const ProjectOdd = [];
    const ProjectEven = [];
    dataProject.map((item, index) => {
      index % 2 !== 0 ? (
        ProjectOdd.push(item)
      ) : (
        ProjectEven.push(item)
      )
    })
    setdataProjectOdd([...ProjectOdd])
    setdataProjectEven([...ProjectEven])
  }, [dataProject])

  useEffect(() => {
    async function fetchData() {
      const res = await getFollowing(getCookie("auth"));

      if (res) {
        if (res.status === "200") {
          setdataProject(res.data);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center px-24 mt-24 gap-12 text-white">
      <div className="flex flex-wrap justify-center w-full h-full gap-6 ">
      <div className="flex flex-col gap-6 items-start">
          {dataProjectOdd.map((item, index) => (
            <div className="p-6 bg-slate-900 rounded-lg w-96 " key={index}>
              <div className="border-b border-slate-700 flex items-center justify-between pb-4">
                <Link
                  href={`/profile/${item.owner_username}`}
                  className="flex items-center gap-2"
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
                  <div className="flex flex-col justify-center w-32 h-10">
                    <h3 className={`${font.Satoshi_c2regular} text-white`}>
                      {item.owner_name}
                    </h3>
                    <p className={`${font.Satoshi_c1medium} text-slate-300`}>
                      @{item.owner_username}
                    </p>
                  </div>
                </Link>

                <Popover placement="left-top">
                  <Popover.Trigger>
                    <div className="cursor-pointer">
                      <FaEllipsisH />
                    </div>
                  </Popover.Trigger>
                  <Popover.Content>
                    <OptionsCard
                      username={item.owner_username}
                      isMyProject={item.isMyProject}
                      title={item.title}
                      id={item.id}
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
                      className={` ${font.Satoshi_c3bold} flex justify-center rounded-full border border-slate-500 py-1 px-2`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="my-4 text-justify">
                <p className={`${font.Satoshi_c2medium}`}>{item.description}</p>
              </div>

              <div className="flex justify-center items-center">
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
                  onClick={() => copylink(item.id)}
                >
                  <FaShare className="hover:fill-green-400" />
                </div>
              </div>
            </div>
          ))}
          
        </div>
        <div className="flex flex-col gap-6 items-start">
          {dataProjectEven.map((item, index) => (
            <div className="p-6 bg-slate-900 rounded-lg w-96 " key={index}>
              <div className="border-b border-slate-700 flex items-center justify-between pb-4">
                <Link
                  href={`/profile/${item.owner_username}`}
                  className="flex items-center gap-2"
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
                  <div className="flex flex-col justify-center w-32 h-10">
                    <h3 className={`${font.Satoshi_c2regular} text-white`}>
                      {item.owner_name}
                    </h3>
                    <p className={`${font.Satoshi_c1medium} text-slate-300`}>
                      @{item.owner_username}
                    </p>
                  </div>
                </Link>

                <Popover placement="left-top">
                  <Popover.Trigger>
                    <div className="cursor-pointer">
                      <FaEllipsisH />
                    </div>
                  </Popover.Trigger>
                  <Popover.Content>
                    <OptionsCard
                      username={item.owner_username}
                      isMyProject={item.isMyProject}
                      title={item.title}
                      id={item.id}
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
                      className={` ${font.Satoshi_c3bold} flex justify-center rounded-full border border-slate-500 py-1 px-2`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="my-4 text-justify">
                <p className={`${font.Satoshi_c2medium}`}>{item.description}</p>
              </div>

              <div className="flex justify-center items-center">
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
                  onClick={() => copylink(item.id)}
                >
                  <FaShare className="hover:fill-green-400" />
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
