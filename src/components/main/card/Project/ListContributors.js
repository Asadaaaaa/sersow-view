import { getCookie } from 'cookies-next';
import { useEffect, useState } from "react";
import { Loading } from "@nextui-org/react";

import Contributor from "@/api/project/contributor";
import Avatar from "@/components/main/card/User/Avatar";
import ButtonFollow from "@/components/main/card/User/ButtonFollow";
import UserContainer from "@/components/main/card/User/UserContainer";
import styles from '@/components/main/card/Project/project.module.css';

export default function ListContributors ({projectId}) {
  const [contributor, setContributor] = useState(null);

  useEffect(() => {
    async function getContributor() {
			const res = await Contributor(projectId, getCookie("auth"));

			if (res) {
				if (res.status === "200") {
						setContributor(res.data)				
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
    if(projectId !== null){
      getContributor();
    }
  },[])

  return(
    <div className={` ${styles.listContributorScrollbar} max-h-[400px] overflow-y-auto overflow-x-hidden`}>
      <div className={` flex flex-col items-center gap-6 p-0 `}>
        <div className={`flex flex-col gap-3 max-w-fit `}>
            {
              contributor !== null ? (
                  contributor.map((item, index) => {
                    return(
                      <UserContainer key={item.user_id} style={"pr-2"} >
                        <Avatar 
                          username={item.username}
                          name={item.nameSubstr}
                          image={item.image}
                        />
                        <ButtonFollow 
                          id={item.user_id}
                          isMyProfile={item.isMyProfile}
                          isFollowed={item.isFollowed}
                        />
                      </UserContainer>
                    )
                  })
              ) : (
                <div className="flex w-[400px] justify-center">
                  <Loading />
                </div>          
              )
            }
        </div>
      </div>
    </div>
  )
}