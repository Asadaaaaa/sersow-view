import Image from "next/image";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";

import font from "@/app/font.module.css";
// import LogoDummy from "../../../../public/dummy/DummyLogo1.png";
// import Mikakitchen from "../../../../public/dummy/Mikakitchen.png";
// import DummyThumbnail from "../../../../public/dummy/DummyThumbnail1.png";
import getForyou from "@/api/discover/getForYou";
import {
  FaChartLine,
  FaEllipsisH,
  FaRegHeart,
  FaRegComment,
  FaShare,
} from "react-icons/fa";

export default function Project() {
  const [dataProject, setDataProject] = useState([]);

  useEffect(() => {
    // async function getForyou() {
    //   let res = await getForyou(getCookie("auth"));

    //   if (res.status === "200") {
    //     return res;
    //   } else if (res.status === "unauth") {
    //     deleteCookie("auth");
    //     deleteCookie("refreshAuth");

    //     location.reload();
    //   }
    // }

    async function fetchData() {
      const res = await getForyou(getCookie("auth"));

      if (res.status === "200") {
        setDataProject(res.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex relative justify-center my-24 text-white">
      <div>
        {/* <div
          className={`${font.Satoshi_b2medium} flex gap-x-4 fixed z-10 w-full pt-4 pb-6 bg-gradient-b  from-slate-900/60 to-slate-900/20 backdrop-blur-md `}
        >
          <div className="border bg-slate-900 border-slate-500 rounded-full py-2 px-4  ">
            All
          </div>
          <div className="border bg-slate-900 border-slate-500 rounded-full py-2 px-4 ">
            Software Engineering
          </div>
          <div className="border bg-slate-900 border-slate-500 rounded-full py-2 px-4 ">
            UI/UX
          </div>
          <div className="border bg-slate-900 border-slate-500 rounded-full py-2 px-4 ">
            Data Science
          </div>
          <div className="border bg-slate-900 border-slate-500 rounded-full py-2 px-4 ">
            Artificial Intelligence
          </div>
          <div className="border border-slate-500 rounded-full py-2 px-4 ">
            Python
          </div>
        </div> */}
        <div className="mt-24 h-[200vh] relative ">
          <div
            className={`${font.Satoshi_b2medium}  flex gap-2 mb-6 items-center`}
          >
            <FaChartLine className="w-6 h-6" />
            <p> TRENDS</p>
          </div>

          {/* <div className="flex flex-wrap gap-6 items-start">
            {dataProject.map((items, index) => {
              <>
                <div className="p-6 bg-slate-900 rounded-lg w-96 ">
                  <div className="border-b border-slate-700 flex items-center justify-between pb-4">
                    <div className="flex items-center ">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_HOST +
                          "/" +
                          process.env.NEXT_PUBLIC_VERSION +
                          items.owner_image
                        }
                        className="w-12 mr-2"
                      />
                      <p className={`${font.Satoshi_c2medium}`}>@Asadaaaaa</p>
                    </div>
                    <FaEllipsisH />
                  </div>

                  <div className="flex items-center my-4">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_HOST +
                        "/" +
                        process.env.NEXT_PUBLIC_VERSION +
                        items.logo
                      }
                      className="w-16 mr-2"
                    />
                    <p className={`${font.Satoshi_h5bold}`}>{items.title}</p>
                  </div>

                  {/* <div
                    className={`${font.Satoshi_c3bold} flex gap-2 justif-center`}
                  >
                    <div className="rounded-full border border-slate-500 py-1 px-2">
                      Website
                    </div>
                    <div className="rounded-full border border-slate-500 py-1 px-2">
                      Showcase
                    </div>
                    <div className="rounded-full border border-slate-500 py-1 px-2">
                      Artwork
                    </div>
                  </div> 

                  <div className="my-4 text-justify">
                    <p className={`${font.Satoshi_c2medium}`}>
                      {items.description}
                    </p>
                  </div>

                  <div>
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_HOST +
                        "/" +
                        process.env.NEXT_PUBLIC_VERSION +
                        items.thumbnail[1]
                      }
                      className="object-scale-down h-40 w-80"
                    />
                  </div>

                  <div className="flex mt-12 bg-slate-800 rounded-xl py-2 justify-evenly">
                    <div className="px-10 border-r border-slate-600">
                      <FaRegHeart />
                    </div>
                    <div className="px-10 border-r border-slate-600">
                      <FaRegComment />
                    </div>
                    <div className="px-10">
                      <FaShare />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-lg w-96 ">
                  <div className="border-b border-slate-700 flex items-center justify-between pb-4">
                    <div className="flex items-center ">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_HOST +
                          "/" +
                          process.env.NEXT_PUBLIC_VERSION +
                          items.owner_image
                        }
                        className="w-12 mr-2"
                      />
                      <p className={`${font.Satoshi_c2medium}`}>"@Asadaaa"</p>
                    </div>
                    <FaEllipsisH />
                  </div>

                  <div className="flex items-center my-4">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_HOST +
                        "/" +
                        process.env.NEXT_PUBLIC_VERSION +
                        items.logo
                      }
                      className="w-16 mr-2"
                    />
                    <p className={`${font.Satoshi_h5bold}`}>{items.title}</p>
                  </div>

                  <div
                    className={`${font.Satoshi_c3bold} flex gap-2 justif-center`}
                  >
                    <div className="rounded-full border border-slate-500 py-1 px-2">
                      Website
                    </div>
                    <div className="rounded-full border border-slate-500 py-1 px-2">
                      Showcase
                    </div>
                    <div className="rounded-full border border-slate-500 py-1 px-2">
                      Artwork
                    </div>
                  </div>

                  <div className="my-4 text-justify">
                    <p className={`${font.Satoshi_c2medium}`}>
                      Publish your project, showcase your work. Sersow is the
                      platform for RPL individuals from UPI Cibiru showcase
                      their projects. ‘Cause you know, Your work could
                      inspire...
                    </p>
                  </div>

                  <div className="flex  bg-slate-800 rounded-xl py-2 justify-evenly">
                    <div className="px-10 border-r border-slate-600">
                      <FaRegHeart />
                    </div>
                    <div className="px-10 border-r border-slate-600">
                      <FaRegComment />
                    </div>
                    <div className="px-10">
                      <FaShare />
                    </div>
                  </div>
                </div>
              </>;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}
