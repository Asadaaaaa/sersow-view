"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { FaEdit, FaRegHeart, FaHeart, FaTrash, FaTrashAlt, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

import font from '@/app/font.module.css';
import Header from '@/components/main/header/Header';
import BgGradient from '@/components/main/BgGradient';
import { IsLogin } from '@/components/main/LoginContext';
import CardTitle from '@/components/main/settings/CardTitle';
import styles from '@/components/main/project/project.module.css';
import CardRedButton from '@/components/main/settings/CardRedButton';
import CardPrimaryButton from '@/components/main/settings/CardPrimaryButton';

import Like from '@/api/activity/project/like';
import Unlike from '@/api/activity/project/unlike';
import Comment from '@/api/activity/project/comment';
import DeleteProject from '@/api/project/delete-project';
import DetailsProject from '@/api/project/details-project';
import DeleteComment from '@/api/activity/project/deleteComment';
import CommentCard from '@/components/main/card/Project/CommentCard';
import PopupContainer from '@/components/main/settings/PopupContainer';
import ListContributors from '@/components/main/card/Project/ListContributors';

export default function DetailProject({ params }) {

	const router = useRouter();
	const { isLogin } = useContext(IsLogin);

	const [dataProject, setDataProject] = useState(null);
  const [toogle, setToogle] = useState(false);
	const [dataUser, setDataUser] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState(false);
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
					setcommentsList([{...dataUser, comment:fieldComment, isMyComment:true, commentId:res.data.commentId}, ...commentsList])
				} else if (res.status === "unauth") {
					router.push("login");
				} else if (res.status === "spam") {
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

	async function deleteComment(commentId, projectId) {
		if (isLogin) {
			const res = await DeleteComment(commentId, projectId ,getCookie("auth"));
			
			if (res) {
				if (res.status === "200") {
					setcommentsList((val) => val.filter((comment) => comment.commentId !== commentId));
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

	async function deleteProject(id) {

		setDeleteLoading(true);

		const res = await DeleteProject(id, getCookie("auth"));

		if (res.status === "200") {
			if (res) {
				if (res.status === "200") {
					toast.success("Success to Delete Project", {
						position: "top-center",
						autoClose: 2500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});

					router.push("/profile");
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

		setDeleteLoading(false);
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
	}, []);

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
											<Link href={`/profile/${dataProject.owner.username}`}>
												<div className="flex gap-4 items-center">
													<div>
														<Image 
															alt="sersow profile photo"
															src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.owner.image}
															width={96} 
															height={96} 
															className="w-12 h-12 rounded-full object-cover"
														/>
													</div>
													<div className="flex flex-col">
														<h1 className={`${font.Satoshi_c1medium} text-white`}>{dataProject.owner.name}</h1>
														<h1 className={`${font.Satoshi_c2regular} text-slate-300`}>{"@" + dataProject.owner.username}</h1>
													</div>
												</div>
											</Link>
											{
												dataProject.isMyProject && (
													<div>
														<div className="flex items-center">
															<Link href={"/project/edit/" + dataProject.id}>
																<CardPrimaryButton
																	disabled={deleteLoading}
																>
																	<div className="flex gap-2">
																		<FaEdit className="w-4 h-4 text-white" />
																		<h2>{dataProject.published ? "Edit Project" : "Edit Draft"}</h2>
																	</div>
																</CardPrimaryButton>
															</Link>
															<CardRedButton
																disabled={deleteLoading}
																clickHandler={() => setDeleteConfirmationPopup(true)}
															>
																<div className="flex gap-2">
																{
																	deleteLoading ? (
																		<Loading type="points-opacity" size="md" color="white" style={{ width: "106.09", height: "17.99px" }} />
																	) : (
																		<>
																			<FaTrash className="w-4 h-4 text-white" />
																			<h2>{ dataProject.published ? "Delete Project" : "Delete Draft" }</h2>
																		</>
																	)
																}
																</div>
															</CardRedButton>
															{
																deleteConfirmationPopup && (
																	<div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/50 border-solid border-slate-700 border-r-[1px]">
																		<PopupContainer>
																			<CardTitle 
																				title={dataProject.title} 
																				closable={true} 
																				closeHandler={() => {
																					setDeleteConfirmationPopup(false);
																				}} 
																			/>
																			<div className="flex flex-col items-center gap-2">
																				<div>
																					<FaExclamationTriangle className="text-amber-400 w-6 h-6" />
																				</div>
																				<div className={`${font.Satoshi_b2bold} text-slate-400`}>
																					<h4>This is a marvelous project.</h4>
																					<h4>Are you sure want to delete it?</h4>
																				</div>
																			</div>
																			<div className="flex">
																				<div className="py-1 px-2">
																					<button
																						disabled={deleteLoading}
																						className="py-3 px-6 bg-gradient-to-b from-rose-500 to to-rose-600 rounded-xl"
																						onClick={async() => {
																							await deleteProject(dataProject.id);
																							setDeleteConfirmationPopup(false)
																						}}
																					>
																						<div className="flex items-center justify-center gap-2 w-36">
																							{
																								deleteLoading ? (
																									<Loading type="points-opacity" size="md" color="white" style={{ width: "106.09", height: "17.99px" }} />
																								) : (
																									<>
																										<div><FaTrashAlt className="text-white w-5 h-5" /></div>
																										<h3 className={`${font.Satoshi_b2bold} text-white`}>Drop it</h3>
																									</>
																								)
																							}
																						</div>
																					</button>
																				</div>
																				<div className="py-1 px-2">
																					<button 
																						disabled={deleteLoading}
																						className="py-3 px-6 border-solid border-[1px] border-slate-300 rounded-xl"
																						onClick={() => setDeleteConfirmationPopup(false)}
																					>
																						<div className="flex items-center justify-center w-36">
																							<h3 className={`${font.Satoshi_b2bold} text-white`}>No, I reconsider</h3>
																						</div>
																					</button>
																				</div>
																			</div>
																		</PopupContainer>
																	</div>
																)
															}
														</div>
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
																	src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProject.thumbnail.url+ "?key=" + Date.now()} 
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
																	src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + item+ "?key=" + Date.now()} 
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
										{
											dataProject.contributors === null ? (<></>) : (
												<>
												<div className="flex flex-col gap-2 max-w-fit">
													<div className="flex items-center gap-3">
														<h1 className={`${font.Satoshi_h5bold} text-white`}>Contibutors</h1>
														<span className={`${font.Satoshi_c1medium} text-slate-400`}>({dataProject.contributors.length})</span>
													</div>
													<div className="flex flex-wrap max-w-[450px] items-center cursor-pointer gap-3" onClick={() => setToogle(true)}>
														<>
														{
															dataProject.contributors.map((item,index) => {
																if(index > 10) return(<></>)
																return(
																	<Image
																		key={index} 
																		alt="sersow profile photo"
																		src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + item}
																		width={96} 
																		height={96} 
																		className={`inline-block rounded-full w-10 h-10 object-cover`}
																	/>
																)
															})
														}
														{
															dataProject.contributors.length > 11 &&(
																<div className={`${font.Satoshi_c1medium} text-white`}>
																	+{(dataProject.contributors.length) - 11}
																</div>
															)
														}
														</>

													</div>
												</div>	
												</>
											)
										}
										{
											toogle &&(
												<>
												<div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/50 border-solid border-slate-700 border-r-[1px]">
													<div className="flex flex-col p-6 gap-4 bg-slate-900  rounded-xl border-slate-700 border-[1px]">
														<div className="flex justify-between items-start pb-3 border-b-slate-700 border-b-2 gap-3">
																<div className={`${font.Satoshi_b2bold} text-white cursor-pointer`}>Project Contributors</div>
																<div className="cursor-pointer pt-1" onClick={() => setToogle(false)}>
																	<FaTimes className="w-4 h-4 text-white" />
																</div>
														</div>
															{
																<ListContributors projectId={dataProject.id}/>	
															}
													</div>
												</div>
												</>
											)
										}
										<div className="flex flex-col gap-1">
											<h1 className={`${font.Satoshi_c2medium} text-white`}>{dataProject.published ? "Published in" : "Created in"}</h1>
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
										{
											dataProject.published && (
												<>
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
																	<form>
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
																		<CardPrimaryButton text={"Post Comment"} 
																			submit={"submit"}
																			clickHandler={(e) => {
																				e.preventDefault();
																				comment(dataProject.id)
																			}} 
																			disabled={!fieldComment}
																		/>
																	</div>
																	</form>
																	)
																}
															</div>
																{
																	dataProject["comments"] !== null ? (
																	<>
																		{
																			commentsList.map((item, index) => {
																				return(
																					<CommentCard
																						key={item.commentId}
																						data = {item}
																						index = {index}
																						click={() => {
																							deleteComment(item.commentId, dataProject.id)
																						}}
																					/>
																				)
																			})
																		}
																	</>
																	): (null)
															}
													</div>
												</>
											)
										}
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