"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Loading } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect , useContext} from 'react';
import { FaUserEdit, FaLink, FaEnvelope, FaRegEnvelope, FaRegCalendarAlt, FaTimes } from 'react-icons/fa';

import Draft from './Draft';
import Collabs from './Collabs';
import Projects from './Projects';
import font from '@/app/font.module.css';
import BgGradient from '@/components/main/BgGradient';
import Avatar from "@/components/main/card/User/Avatar";
import { IsLogin } from "@/components/main/LoginContext";
import styles from '@/components/main/profile/profile.module.css';
import ButtonFollow from "@/components/main/card/User/ButtonFollow";
import UserContainer from "@/components/main/card/User/UserContainer";

import Profile from '@/api/profile/profile';
import Follow from '@/api/activity/user/follow';
import Unfollow from '@/api/activity/user/unfollow';
import GetFollower from '@/api/profile/get/follower';
import GetFollowing from '@/api/profile/get/following';

export default function Main({ username }) {

  const router = useRouter();
  const { isLogin } = useContext(IsLogin);
  const [ListCard, setListCard] = useState(false);

  const [page, setPage] = useState(0);
  const [listFollow, setListFollow] = useState(null);
  const [dataUser, setDataUser] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [dataProfile, setDataProfile] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const urlProfile = "https://beta.sersow.otech.id/profile/" + username;

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${month}, ${year}`;
    return formattedDate;
  }

  async function follow(userId) {
    if (isLogin) {
      setDataUser(
        dataUser.map((item) =>
          item.id === userId ? { ...item, isFollowed: true } : item
        )
      );
    }
    
    const res = await Follow(userId, getCookie("auth"));
  
    if (res.status === "200") {
      setIsFollowed(true);
    } else if (res.status === "unauth") {
      router.push("login");
    }
  }

  async function unfollow(userId) {
    if (isLogin) {
      setDataUser(
        dataUser.map((item) =>
          item.id === userId ? { ...item, isFollowed: false } : item
        )
      );
    }

    const res = await Unfollow(userId, getCookie("auth"));

    if (res.status === "200") {
      setIsFollowed(false);
    } else if (res.status === "unauth") {
      router.push("login");
    }
  } 

  useEffect(() => {
    async function getUserFollowing() {
      const res = await GetFollowing(getCookie("auth"), dataProfile.id);
      if(res){
        if (res.status === "200") {
          setDataUser(res.data)
        } else if (res.status === "unauth") {
          location.reload();
        } else if (res.status === "notfound") {
          setNotFound(true);
        }
      }
    }
    async function getUserFollower() {
      const res = await GetFollower(getCookie("auth"), dataProfile.id);
      if(res){
        if (res.status === "200") {
          setDataUser(res.data)
        } else if (res.status === "unauth") {
          location.reload();
        } else if (res.status === "notfound") {
          setNotFound(true);
        }
      }
    }
    
    async function fetchData() {
      const res = listFollow ? (await getUserFollower()) : (await getUserFollowing())
      if (res) {
        if (res.status === "200") {
          setDataUser(res);
        }
      }
    }
    if(dataProfile !== null){
      fetchData();
    }
  },[listFollow])

  useEffect(() => {
    async function getProfile() {
      const res = await Profile(username, getCookie("auth"));

      if (res.status === "200") {
        setDataProfile(res.data);
        setIsFollowed(res.data.isFollowed);
      } else if (res.status === "unauth") {
        location.reload();
      } 
      else if (res.status === "notfound") {
        setNotFound(true);
      }
    }

    if (username) {
      getProfile();
    }
  }, [dataUser,ListCard])

  useEffect(() => {
   
    async function getProfile() {
      const res = await Profile(username, getCookie("auth"));

      if (res.status === "200") {
        setDataProfile(res.data);
        setIsFollowed(res.data.isFollowed);
      } else if (res.status === "unauth") {
        location.reload();
      } 
      else if (res.status === "notfound") {
        setNotFound(true);
      }
    }

    if (username !== null) {
      getProfile();    
    }
  }, []);

  return (
    <div className="w-[1016px] relative h-screen">
      <BgGradient />
      <div className="h-screen pt-24 flex justify-center">
        <div className="h-full py-12 w-fit flex gap-12">
          {
            notFound ? (
              <h1 className={`${font.Satoshi_h2medium} text-white`}>User Not Found!</h1>
            ) : (
              <>
                <div className="h-full flex flex-col gap-4 pt-2 pr-6 w-[216px] border-solid border-slate-700 border-r-[1px]">
                  {
                    dataProfile ? (
                      <>
                        <div>
                          <Image 
                            src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProfile.image + "?key=" + Date.now()}
                            width={192}
                            height={192}
                            className="w-48 h-48 rounded-full object-cover" 
                          />
                        </div>
                        <div className="flex justify-center">
                          <div className="py-1 px-2">
                            {
                              dataProfile.isMyProfile ? (
                                <Link href={"settings/profile"}>
                                  <button className={`${font.Satoshi_c2bold} flex justify-center gap-2 w-[136px] py-2 text-white bg-gradient-to-b from-purple-500 to to-violet-600 rounded-3xl`}>
                                    <FaUserEdit className="w-4 h-4" />
                                    <h3>Edit</h3>
                                  </button>
                                </Link>
                              ) : (
                                isFollowed ? (
                                  <button 
                                    className={`${font.Satoshi_c2bold} w-[136px] py-2 text-slate-200 border-solid border-slate-700 border-[1px] rounded-3xl`}
                                    onClick={() => unfollow(dataProfile.id)}
                                  >
                                    Following
                                  </button>
                                ) : (
                                  <button 
                                    className={`${font.Satoshi_c2bold} w-[136px] py-2 text-slate-700 bg-slate-200 border-solid border-white border-[1px] rounded-3xl`}
                                    onClick={() => follow(dataProfile.id)}
                                  >
                                    Follow
                                  </button>
                                )
                              )
                            }
                          </div>
                          <div className="p-[6px]">
                            <button 
                              className="border-solid border-slate-300 border-[1px] rounded-full p-2"
                              onClick={() => {
                                navigator.clipboard.writeText(urlProfile);
                                toast.success("Link copied", {
                                  position: 'top-center',
                                  autoClose: 2500,
                                  hideProgressBar: true,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: 'colored',
                                });
                              }}
                            >
                              <FaLink className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        </div>
                        <div className='max-w-[190px] break-words'>
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
                                <a href={dataProfile.website} target='_blank'>
                                  <h4 className={`${font.Satoshi_c2regular} text-slate-400`}>{dataProfile.website}</h4>
                                </a>
                              </div>
                            )
                          }
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
          
                              <div className={`${font.Satoshi_c2regular} text-slate-400 cursor-pointer`} 
                                onClick={() => {
                                  setListCard(true)
                                  setListFollow(true);
                                }}>
                                <span className={`${font.Satoshi_c2medium} text-white`}>{dataProfile.total_follower}</span>
                                {" "}followers
                              </div>
                              {
                                ListCard && (
                                <>
                                <div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/90 border-solid border-slate-700 border-r-[1px]">
                                  <div className="flex flex-col p-6 gap-2 bg-slate-900  rounded-xl border-slate-700 border-[1px]">
                                    <div className="flex justify-between items-start pb-3 border-b-slate-700 border-b-2">
                                        <div className={`${font.Satoshi_b2bold} text-white cursor-pointer`}>@{dataProfile.username}</div>
                                        <div className="cursor-pointer pt-1" onClick={() => setListCard(false)}>
                                          <FaTimes className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex items-center py-3"> 
                                      <div className={`flex flex-auto justify-center items-center px-6 cursor-pointer ` + (listFollow ? ("text-cyan-400") : ("text-slate-400"))} onClick={() => setListFollow(true)}>
                                        Followers
                                      </div>
                                      <div className={"flex flex-auto justify-center items-center px-6 border-l-slate-700 border-l-[1px] cursor-pointer " + (!listFollow ? ("text-cyan-400") : ("text-slate-400"))} onClick={() => setListFollow(false)}>
                                        Followings
                                      </div>
                                    </div>
                                    <div className={`${styles.listFollowScrollbar} max-h-[400px] overflow-y-auto`}>

                                      <div className={` flex flex-col justify-center gap-6 p-0 `}>
                                      {
                                        dataUser.length !== 0 ? (
                                        <>
                                          {  
                                            dataUser.map((item, index) => (
                                              <UserContainer 
                                                index={item.id} 
                                                style={"pr-2"} 
                                              >
                                                <Avatar 
                                                  username={item.username}
                                                  name={item.nameSubstr}
                                                  image={item.image}
                                                />
                                                <ButtonFollow 
                                                  id={item.id}
                                                  isMyProfile={item.isMyProfile}
                                                  isFollowed={item.isFollowed}
                                                />
                                              </UserContainer>
                                            ))
                                          }
                                        </>
                                        ) : (
                                          <>
                                          {
                                            listFollow ? 
                                                (<div className={`${font.Satoshi_c1medium} flex flex-col text-slate-400 text-center w-[300px]`}>
                                                  <p>Currently you don't have any</p>
                                                  <p> Go out and rizz everyone</p>
                                                </div>) : 
                                                (<div className={`${font.Satoshi_c1medium} flex flex-col text-slate-400 text-center w-[300px]`}>
                                                  <p>Currently you don't have any</p>
                                                  <p>You really need some friends</p>
                                                </div>)
                                            
                                          }
                                          </>
                                        )
                                      }
                                      
                                    </div>
                                    </div>
                                  </div>
                                </div>
                                </>
                                )
                              }
                            
                            <hr className="w-2 border-slate-700" />
                            <div className={`${font.Satoshi_c2regular} text-slate-400 cursor-pointer`} 
                              onClick={() => {setListCard(true)
                                              setListFollow(false);
                            }}>
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
                        <Loading />
                      </div>
                    )
                  }
                </div>
                <div className="w-[560px] h-full">
                  <div className={`${font.Satoshi_b2bold} pb-2 flex gap-2 border-solid border-slate-700 border-b-[1px]`}>
                    <div 
                      className={"py-2 px-4 cursor-pointer " + (page === 0 ? "text-cyan-400" : "text-slate-400")}
                      onClick={() => setPage(0)}
                    >
                      Projects
                    </div>
                    <div 
                      className={"py-2 px-4 cursor-pointer " + (page === 1 ? "text-cyan-400" : "text-slate-400")}
                      onClick={() => setPage(1)}
                    >
                      Collabs
                    </div>
                    {
                      (dataProfile && dataProfile.isMyProfile) && (
                        <div 
                          className={"py-2 px-4 cursor-pointer " + (page === 2 ? "text-cyan-400" : "text-slate-400")}
                          onClick={() => setPage(2)}
                        >
                          Drafts
                        </div>
                      )
                    }
                  </div>
                  <div className={`${styles.profileScrollbar} py-6 overflow-y-auto h-full`}>
                    {
                      dataProfile !== null ? (
                        <>
                          {
                            page === 0 && (
                              <Projects userId={dataProfile.id}/>
                            )
                          }
                          {
                            page === 1 && (
                              <Collabs userId={dataProfile.id} />
                            )
                          }
                          {
                            page === 2 && (
                              <Draft />
                            ) 
                          } 
                        </>
                      ) : null
                    }
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1250}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}