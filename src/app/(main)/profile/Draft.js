"use client";

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Loading } from '@nextui-org/react';
import { getCookie } from 'cookies-next';

import font from '@/app/font.module.css';
import MyDraft from '@/api/project/my-draft';
import TitleProject from '@/components/main/card/Project/TitleProject';
import CategoryProject from '@/components/main/card/Project/CategoryProject';
import ThumbnailProject from '@/components/main/card/Project/ThumbnailProject';
import DescriptionProject from '@/components/main/card/Project/DescriptionProject';

export default function Draft() {

	const [dataProject, setDataProject] = useState(null);
	const [loadingData, setLoadingData] = useState(true);

	useEffect(() => {
		async function myDraft() {
			const res = await MyDraft(getCookie("auth"));
			
			if (res) {
				if (res.status === "200") {
					setDataProject(res.data);
					setLoadingData(false);
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
	}, []);

	return (
    <div className="flex flex-col items-center w-full gap-6 text-white">
      {
        loadingData ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : dataProject.length !== 0 ? (
          dataProject.map((item) => (
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
          ))
        ) : (
          <h1 className={`${font.Satoshi_h4medium} text-white`}>No project at the moment.</h1>
        )
      }
    </div>
  );
}