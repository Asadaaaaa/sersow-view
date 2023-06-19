import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";

import font from "@/app/font.module.css";
import Follow from "@/api/activity/user/follow";
import Unfollow from "@/api/activity/user/unfollow";
import { IsLogin } from "@/components/main/LoginContext";


export default function ButtonFollow({ id, isMyProfile, isFollowed}){
	const router = useRouter();

	
	const { isLogin } = useContext(IsLogin);
	const [isFollow,setIsFollowed] = useState(isFollowed);

	async function follow(id) {
		if (isLogin) {		
			setIsFollowed(!isFollowed)
			const res = await Follow(id, getCookie("auth"));
			if(res){
				if (res.status === "200") {
				} else if (res.status === "unauth") {
					router.push("login");
				}
			}
		}
	}
	
	async function unfollow(id) {
		if (isLogin) {
			setIsFollowed(!isFollowed)
			const res = await Unfollow(id, getCookie("auth"));
			if(res){
				if (res.status === "200") {
				}
				} else if (res.status === "unauth") {
					router.push("login");
				}
		}
	}

	useEffect(() => {
		console.log(isFollow);
	},[isFollow])
	return isMyProfile ? (
		<div className={`${font.Satoshi_c2bold} text-center w-[104px] text-slate-200 py-2 pl-[52px]`} >
			You
		</div>
	) : isFollow ? (
		<button className={`${font.Satoshi_c2bold} py-2 px-4 text-slate-200 border-solid border-slate-700 border-[1px] rounded-3xl`}
			onClick={() => { unfollow(id) }}
		>
			Following
		</button>
	) : (
		<button className={`${font.Satoshi_c2bold} py-2 px-4 text-slate-700 bg-slate-200 border-solid border-white border-[1px] rounded-3xl`}
			onClick={() => { follow(id) }}
		>
			Follow
		</button>
	)
}