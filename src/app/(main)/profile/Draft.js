"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Loading } from "@nextui-org/react";
import { getCookie } from "cookies-next";

import MyDraft from "@/api/project/my-draft";
import TitleProject from "@/components/main/card/Project/TitleProject";
import CategoryProject from "@/components/main/card/Project/CategoryProject";
import ThumbnailProject from "@/components/main/card/Project/ThumbnailProject";
import DescriptionProject from "@/components/main/card/Project/DescriptionProject";

export default function Draft() {

	const [dataProject, setDataProject] = useState(null);

	useEffect(() => {
		async function myDraft() {
			const res = await MyDraft(getCookie("auth"));
			
			if (res) {
				if (res.status === "200") {
					setDataProject(res.data);
				} else if (res.status === "unauth") {
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
				<>
				<div className="p-6 bg-slate-900 rounded-lg w-96" key={item.id}>
					<TitleProject 
						id={item.id}
						logo={item.logo}
						title={item.title}
					/>

					<CategoryProject categories={item["categories"]} />                  
					<DescriptionProject description={item.description} />
					<ThumbnailProject thumbnail={item.thumbnail} />
				</div>
				</>
					// <ContainerProject index={index} data={item} />
			))}
		</div>
	);
}