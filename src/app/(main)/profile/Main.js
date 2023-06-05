"use client";

import Error from 'next/error';
import Image from 'next/image';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { FaUserEdit, FaLink, FaEnvelope, FaRegEnvelope, FaRegCalendarAlt } from 'react-icons/fa';

import font from '@/app/font.module.css';
import BgGradient from '@/components/main/BgGradient';
import styles from '@/components/main/profile/profile.module.css';

import Profile from '@/api/profile/profile';
import Follow from '@/api/activity/user/follow';
import Unfollow from '@/api/activity/user/unfollow';

export default function Main({ username }) {

  const router = useRouter();

  const [isFollowed, setIsFollowed] = useState(false);
  const [dataProfile, setDataProfile] = useState(null);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${month}, ${year}`;
    return formattedDate;
  }

  async function follow() {
    const res = await Follow(dataProfile.id, getCookie("auth"));

    if (res.status === "200") {
      setIsFollowed(true);
    } else if (res.status === "unauth") {
      router.push("login");
    }
  }

  async function unfollow() {
    const res = await Unfollow(dataProfile.id, getCookie("auth"));

    if (res.status === "200") {
      setIsFollowed(false);
    } else if (res.status === "unauth") {
      router.push("login");
    }
  } 

  useEffect(() => {
    async function getProfile() {
      let res;

      res = await Profile(username, getCookie("auth"));

      if (res.status === "200") {
        return res;
      } else if (res.status === "unauth") {
        deleteCookie("auth");
        deleteCookie("refreshAuth");

        location.reload();
      } else if (res.status === "notfound") {
        router.push("user-not-found")
      } else {
        throw new Error({statusCode: 500});
      }
    }

    async function fetchData() {
      const res = await getProfile();

      if (res.status === "200") {
        setDataProfile(res.data);
        setIsFollowed(res.data.isFollowed);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-[1016px] relative h-screen">
      <BgGradient />
      <div className="h-screen pt-24 flex justify-center">
        <div className="h-full py-12 w-fit flex gap-12">
          <div className="h-full flex flex-col gap-4 pt-2 pr-6 w-[216px] boreder-solid border-slate-700 border-r-[1px]">
            {
              dataProfile ? (
                <>
                  <div>
                    <Image 
                      src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProfile.image}
                      width={192}
                      height={192}
                      className="w-48 h-48" 
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="py-1 px-2">
                      {
                        dataProfile.isMyProfile ? (
                          <button className={`${font.Satoshi_c2bold} flex justify-center gap-2 w-[136px] py-2 text-white bg-gradient-to-b from-purple-500 to to-violet-600 rounded-3xl`}>
                            <FaUserEdit className="w-4 h-4" />
                            <h3>Edit</h3>
                          </button>
                        ) : (
                          isFollowed ? (
                            <button 
                              className={`${font.Satoshi_c2bold} w-[136px] py-2 text-slate-200 border-solid border-slate-700 border-[1px] rounded-3xl`}
                              onClick={unfollow}
                            >
                              Following
                            </button>
                          ) : (
                            <button 
                              className={`${font.Satoshi_c2bold} w-[136px] py-2 text-slate-700 bg-slate-200 border-solid border-white border-[1px] rounded-3xl`}
                              onClick={follow}
                            >
                              Follow
                            </button>
                          )
                        )
                      }
                    </div>
                    <div className="p-[6px]">
                      <button className="border-solid border-slate-300 border-[1px] rounded-full p-2">
                        <FaLink className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className={`${font.Satoshi_b2bold} text-white`}>{dataProfile.name}</h3>
                    <div className="flex justify-between">
                      <h5 className={`${font.Satoshi_c2regular} text-slate-400`}>{"@" + dataProfile.username}</h5>
                      <h5 className={`${font.Satoshi_c2regular} text-slate-600`}>
                        {
                          dataProfile.gender === 1 ? (
                            "He/Him"
                          ) : (
                            dataProfile.gender === 2 ? (
                              "She/Her"
                            ) : (
                              ""
                            )
                          )
                        }
                      </h5>
                    </div>
                  </div>
                  {
                    dataProfile.bio && (
                      <div className="py-2 border-solid border-slate-700 border-y-[1px]">
                        <h3 className={`${font.Satoshi_c2regular} text-white text-justify`}>
                          {dataProfile.bio}
                        </h3>
                      </div>
                    )
                  }
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <div><FaEnvelope className="w-3 h-3 text-slate-600" /></div>
                      <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>{dataProfile.email_upi}</h4>
                    </div>
                    {
                      dataProfile.email_gmail && (
                        <div className="flex gap-2 items-center">
                          <div><FaRegEnvelope className="w-3 h-3 text-slate-600" /></div>
                          <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>{dataProfile.email_gmail}</h4>
                        </div>
                      )
                    }
                    {
                      dataProfile.website && (
                        <div className="flex gap-2 items-center">
                          <div><FaLink className="w-3 h-3 text-slate-600" /></div>
                          <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>{dataProfile.website}</h4>
                        </div>
                      )
                    }
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <div className={`${font.Satoshi_c2regular} text-slate-400`}>
                        <span className={`${font.Satoshi_c2medium} text-white`}>{dataProfile.total_follower}</span>
                        {" "}followers
                      </div>
                      <hr className="w-2 border-slate-700" />
                      <div className={`${font.Satoshi_c2regular} text-slate-400`}>
                        <span className={`${font.Satoshi_c2medium} text-white`}>{dataProfile.total_following}</span>
                        {" "}following
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`${font.Satoshi_c2regular} text-slate-400`}>
                        <span className={`${font.Satoshi_c2medium} text-white`}>{dataProfile.total_project}</span>
                        {" "}projects
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div><FaRegCalendarAlt className="w-3 h-3 text-slate-600" /></div>
                    <div className={`${font.Satoshi_c3regular} text-slate-400`}>{"since " + formatTimestamp(dataProfile.createdAt)}</div>
                  </div>
                </>
              ) : (
                <div className="pt-12 flex justify-center">
                  <Loading>
                    Loading
                  </Loading>
                </div>
              )
            }
          </div>
          <div className="w-[560px] h-full">
            <div className={`${font.Satoshi_b2bold} text-slate-400 pb-2 flex gap-2 border-solid border-slate-700 border-b-[1px]`}>
              <div className="py-2 px-4">Projects</div>
              <div className="py-2 px-4">Collabs</div>
              <div className="py-2 px-4">Likes</div>
            </div>
            <div className={`${styles.profileScrollbar} pt-6 overflow-y-auto h-full`}>
              <div className="h-[5000px]">a</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}