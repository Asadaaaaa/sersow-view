"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEllipsisH, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { Loading, Popover } from "@nextui-org/react";
import { deleteCookie, getCookie } from "cookies-next";

import { toast } from "react-toastify";
import font from "@/app/font.module.css";
import MyDraft from "@/api/project/my-draft";
import { OptionsCard } from "@/components/main/discover/projectOptionsCard";

export default function Draft() {

	const [dataProject, setDataProject] = useState(null);

	useEffect(() => {
		async function myDraft() {
			const res = await MyDraft(getCookie("auth"));
			
			if (res) {
				if (res.status === "200") {
					console.log(res.data);
					setDataProject(res.data);
				} else if (res.status === "unauth") {
					deleteCookie("auth");
					deleteCookie("refreshAuth");

					location.reload();
				} else {
					toast.error('Failed to fetch draft', {
						position: 'top-center',
						autoClose: 2500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'colored',
					});
				}
			} else {
				toast.error('Failed to fetch draft', {
					position: 'top-center',
					autoClose: 2500,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
				});
			}
		}
		myDraft();
	}, [])

	return !dataProject ? (<div className="flex justify-center"><Loading /></div>) : (
		<div className="flex flex-col gap-6 items-center text-white">
			{dataProject.map((item, index) => (
				<Link href={"project/edit/" + item.id}>
					<div className="p-6 bg-slate-900 rounded-lg w-96 " key={index}>
						<div className="flex items-center my-4 gap-2">
							<p className={`${font.Satoshi_h5bold}`}>{item.title}</p>
						</div>
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
							<p className={`${font.Satoshi_c2medium}`}>{item.description}</p>
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
					</div>
				</Link>
			))}
		</div>
	);
}