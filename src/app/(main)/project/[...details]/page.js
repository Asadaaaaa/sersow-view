"use client";

import Image from 'next/image';
import { ToastContainer,toast } from 'react-toastify';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useEffect, useState, useContext, useRef } from 'react';
import { FaEdit, FaRegHeart, FaHeart } from 'react-icons/fa';

import font from '@/app/font.module.css';
import Header from '@/components/main/header/Header';
import BgGradient from '@/components/main/BgGradient';
import { IsLogin } from '@/components/main/LoginContext';
import styles from '@/components/main/project/project.module.css';
import CardPrimaryButton from '@/components/main/settings/CardPrimaryButton';

import Like from '@/api/activity/project/like';
import Unlike from '@/api/activity/project/unlike';
import Comment from '@/api/activity/project/comment';
import DetailsProject from '@/api/project/details-project';
// import Input from '@/components/main/settings/Input';
import Link from 'next/link';

export default function DetailProject({ params }) {

	const { isLogin } = useContext(IsLogin);
	const router = useRouter();
	const commentRef = useRef(null);

	const [dataProject, setDataProject] = useState(null);
	const [dataUser, setDataUser] = useState(null);
	const [fieldComment, setFieldComment] =useState("");
	const [commentsList, setcommentsList] = useState(null);

	function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${month}, ${year}`;
    return formattedDate;
  }

	async function comment(projectId) {
    if (isLogin) {
			const res = await Comment(projectId, fieldComment ,getCookie("auth"));
			if(res){
				if (res.status === "200") {
					setFieldComment("");
					setcommentsList([{...dataUser, comment:fieldComment }, ...commentsList])
				} else if (res.status === "unauth") {
					router.push("login");
				} else if (res.status === "spam") {
					// console.log("test");
					toast.error("Failed, Comment Spam Detected", {
						position: "top-center",
						autoClose: 2500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}
			}
		}
  }

	async function like(id) {
		if (isLogin) {
			const res = await Like(id, getCookie("auth"));
			
			if (res) {
				if (res.status === "200") {
					setDataProject({ ...dataProject, isLiked: true, totalLikes: dataProject.totalLikes+1});
				} else if (res.status === "unauth") {
					location.reload();
				} else {
					toast.error("Failed, Server error", {
						position: "top-center",
						autoClose: 2500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}
			}
		} else {
			router.push("login");
		}
	}

	async function unlike(id) {
		if (isLogin) {
			const res = await Unlike(id, getCookie("auth"));
			
			if (res) {
				if (res.status === "200") {
					setDataProject({ ...dataProject, isLiked: false, totalLikes: dataProject.totalLikes-1});
				} else if (res.status === "unauth") {
					location.reload();
				} else {
					toast.error("Failed, Server error", {
						position: "top-center",
						autoClose: 2500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}
			}
		} else {
			router.push("login");
		}
	}

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		element.scrollIntoView({ behavior: 'smooth', block: "center"})
	}

	useEffect(()=> {
		if(window.location.hash === "#comment" && dataProject !== null )
			{
				scrollToSection("comment");
			}
	},[dataProject])

	useEffect(() => {
		async function detailsProject() {
			const res = await DetailsProject(params.details[0], getCookie("auth"));

			if (res) {
				if (res.status === "200") {
					setDataProject(res.data);
					setDataUser(res.data.myIdentity);
					setcommentsList(res.data.comments);					
				} else if (res.status === "unauth") {
					location.reload();
				} else if (res.status === "notfound") {
					setDataProject("notfound");
				} else {
					toast.error("Failed to get data", {
						position: "top-center",
						autoClose: 2500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
				}
			} else {
				toast.error("Failed to get data", {
					position: "top-center",
					autoClose: 2500,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			}
		};

		detailsProject();
	}, [])

  return (
		<>
      <Header />
      <div className="w-full relative h-screen">
        <BgGradient />
        <div className={`${styles.projectContent} w-full max-w-[calc(100vw-120px)] md:max-w-[calc(100vw-268px)] lg:max-w-[calc(100vw-328px)] xl:max-w-[1016px] overflow-y-auto h-screen`}>
          <div className="mt-24 flex justify-center py-12">
						{
							dataProject === "notfound" ? (
								<h1 className={`${font.Satoshi_h2medium} text-white`}>Project Not Found!</h1>
							) : (
								 dataProject ? (
									<div className="w-full flex flex-col gap-6 max-w-[824px] bg-slate-900 rounded-xl p-6">
										<div className="flex justify-between items-center pb-3 border-slate-700 border-b-[1px]">
											<div className="flex gap-4 items-center">
												<div>
													<Image 
														alt="sersow profile photo"
														src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.owner_image}
														width={96} 
														height={96} 
														className="w-12 h-12 rounded-full object-cover"
													/>
												</div>
												<div className="flex flex-col">
													<h1 className={`${font.Satoshi_c1medium} text-white`}>{dataProject.owner_name}</h1>
													<h1 className={`${font.Satoshi_c2regular} text-slate-300`}>{"@" + dataProject.owner_username}</h1>
												</div>
											</div>
											{
												dataProject.isMyProject && (
													<div>
														<CardPrimaryButton>
															<div className="flex gap-2">
																<FaEdit className="w-4 h-4 text-white" />
																<h2>Edit Project</h2>
															</div>
														</CardPrimaryButton>
													</div>
												)
											}
										</div>
										<div className="flex justify-between items-center">
											<div className="flex gap-6 items-center">
												{
													dataProject.logo && (
														<div>
															<Image
																alt="sersow project photo"
																src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.logo} 
																width={128} 
																height={128} 
																className="w-16 h-16 rounded-full object-cover"
															/>
														</div>
													)
												}
												<h1 className={`${font.Satoshi_h5bold} text-white`}>{dataProject.title}</h1>
											</div>
											<div></div>
										</div>
										{
											dataProject.categories && (
												<div className="flex flex-wrap gap-4">
													{
														dataProject.categories.map((item, index) => (
															<div 
																key={index}
																className={`${font.Satoshi_c2bold} py-2 px-3 border-2 rounded-3xl text-slate-100 border-slate-500`}
															>
																{item}
															</div>
														))
													}
												</div>
											)
										}
										{
											(dataProject.preview || dataProject.thumbnail)  &&  (
												<div className={`${styles.detailImages} w-full flex overflow-x-auto`}>
													<div className="w-fit flex gap-6">
														{
															dataProject.thumbnail && (
																<Image
																	src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.thumbnail.url} 
																	alt="sersow project preview"
																	width={512}
																	height={288}
																	className="w-[512px] h-[288px] object-cover rounded-lg"
																/>
															)
														}
														{
															dataProject.preview && 
															dataProject.preview.map((item, index) => (
																<Image 
																	key={index}
																	src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + item} 
																	alt="sersow project preview"
																	width={512}
																	height={288}
																	className="w-[512px] h-[288px] object-cover rounded-lg"
																/>
															))
														}
													</div>
												</div>
								 			)
										}
										<div className="flex flex-col gap-2">
											<h1 className={`${font.Satoshi_h5bold} text-white`}>Description</h1>
											<div>
												<p className={`${font.Satoshi_c1medium} text-slate-400`}>{dataProject.description}</p>
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<h1 className={`${font.Satoshi_c2medium} text-white`}>Published on</h1>
											<div>
												<p className={`${font.Satoshi_c2medium} text-slate-400`}>{formatTimestamp(dataProject.published_datetime)}</p>
											</div>
										</div>
										{
											dataProject.tags && (
												<div className="flex flex-col gap-4">
													<h1 className={`${font.Satoshi_h5bold} text-white`}>Tags</h1>
														<div className="flex flex-wrap gap-2">
															{
																dataProject.tags.map((item, index) => (
																	<div
																		key={index}
																		className={`${font.Satoshi_c2medium} py-1 px-2 flex gap-1 rounded-3xl bg-slate-700 text-white`}
																	>
																		{"#"+item}
																	</div>
																))
															}
														</div>
												</div>
											)
										}
										{
											(dataProject.program || dataProject.paper || dataProject.code) && (
												<div className="flex flex-col gap-4">
													<h1 className={`${font.Satoshi_h5bold} text-white`}>Additionals</h1>
														<div className="flex flex-wrap gap-2">
															{
																dataProject.program && (
																	<CardPrimaryButton 
																		text={dataProject.program.isUrl ? "Open Project" : "Download Project"} 
																		clickHandler={dataProject.program.isUrl ? 
																			() => window.open(dataProject.program.url, "_blank") 
																			: 
																			() => window.open(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.program.url, "_blank")}
																	/>
																)
															}
															{
																dataProject.paper && (
																	<CardPrimaryButton 
																		text={dataProject.paper.isUrl ? "Open Paper" : "Download Paper"} 
																		clickHandler={dataProject.paper.isUrl ? 
																			() => window.open(dataProject.paper.url, "_blank") 
																			: 
																			() => window.open(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.paper.url, "_blank")}
																	/>
																)
															}
															{
																dataProject.code && (
																	<CardPrimaryButton 
																		text={dataProject.code.isUrl ? "Open Source Code" : "Download Source Code"} 
																		clickHandler={dataProject.code.isUrl ? 
																			() => window.open(dataProject.code.url, "_blank") 
																			: 
																			() => window.open(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.code.url, "_blank")}
																	/>
																)
															}
														</div>
												</div>
											)
										}
										<hr className="w-full border-slate-700" />
										<div className="flex gap-4 px-2 py-[5px] items-center">
											<div>
												{
													dataProject.isLiked ? (
														<FaHeart 
															className="w-5 h-5 text-pink-600 cursor-pointer"
															onClick={async() => await unlike(dataProject.id)}
														/>
													) : (
														<FaRegHeart 
															className="w-5 h-5 text-white cursor-pointer"
															onClick={async() => await like(dataProject.id)}
														/>
													)
												}
											</div>
											<div className={`${font.Satoshi_b2bold} text-white select-none`}>{dataProject.totalLikes + " Likes"}</div>
										</div>
										<div className="flex flex-col gap-6">
												<div className="flex flex-col gap-4 ">
													<h1 id="comment" className={`${font.Satoshi_h5bold} text-white`} >Comments</h1>
													{
														dataProject.myIdentity && (
														<div className="flex flex-col items-end gap-2 ">
															<div className="flex gap-4 items-center">
																	<Image
																		alt="Avatar User"
																		className="w-10 h-10 object-cover rounded-full "
																		src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataUser.image }
																		width={220}
																		height={220}
																	/>
																	<input 					
																		placeholder={"Type your comments here..."} 
																		className={`${font.Satoshi_c1regular} w-[715px] py-3 px-6 border-solid text-white border-[1px] bg-transparent outline-none focus:border-white rounded-lg `} 
																		maxLength={200}
																		value={fieldComment}
																		onChange={(e) => setFieldComment(e.target.value)}
																	/>
															</div>
																	<CardPrimaryButton text={"Post Comment"} clickHandler={() => (comment(dataProject.id))} disabled={!fieldComment}/>
														</div>
														)
													}
												</div>
											{
												dataProject["comments"] !== null ? (
													<>
													{
														commentsList.map((item, index) => {
															return(
																<>
																		<div className="flex flex-col gap-2">
																			<div className="flex gap-4 items-start">
																			<Image
																					alt="Avatar User"
																					className="mt-4 w-10 h-10 object-cover rounded-full "
																					src={ process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + item.image }
																					width={220}
																					height={220}
																				/>
																			<div className="flex flex-col w-full p-4 gap-2 bg-slate-800 rounded-r-xl rounded-bl-xl">
																				<div className="flex gap-2 items-start align-top">
																					<Link href={`/profile/${item.username}`} >
																						<h3 className={`${font.Satoshi_c1medium} text-white`}>{item.name}</h3>
																						<p className={`${font.Satoshi_c1medium} text-slate-400`}>@{item.username}</p>
																					</Link>
																					<h3 className={`${font.Satoshi_c1medium} text-slate-500`}>
																						{
																							item.gender === 1 ? (
																								"(He/him)"
																							) : item.gender === 2 ? (
																								"(She/her)"
																							) : ("")
																						}
																					</h3>
																				</div>
																				<p className={`${font.Satoshi_c1medium} text-slate-200`}>{item.comment}</p>
																			</div>
																			</div>
																		</div>
																</>

															)
														})

													}
													</>
												): (null)
											}
										</div>
									</div>
								) : (
									<Loading />
								)
							)
						}
					</div>
        </div>
      </div>
			<ToastContainer
        position="bottom-right"
        autoClose={1250}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
	);
}