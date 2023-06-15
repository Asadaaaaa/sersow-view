import { getCookie } from "cookies-next";
import { Loading } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaChartLine } from "react-icons/fa";

import font from "@/app/font.module.css";
import UserTrends from "@/api/profile/user-trends";
import Avatar from "@/components/main/card/User/Avatar";
import ButtonFollow from "@/components/main/card/User/ButtonFollow";
import UserContainer from "@/components/main/card/User/UserContainer";

export default function User() {


  const [dataProfile, setDataProfile] = useState([]);

  

  useEffect(() => {
    async function getUserTrends() {
      const res = await UserTrends(getCookie("auth"));

      if (res.status === "200") {
        return res;
      } else if (res.status === "unauth") {
        location.reload();
      } else if (res.status === "notfound") {
        router.push("user-not-found");
      }
    }

    async function fetchData() {
      const res = await getUserTrends();

      if (res) {
        if (res.status === "200") {
          setDataProfile(res.data);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex justify-center h-full">
      <div className="flex w-full h-full pt-24">
        <div className="flex flex-col w-full h-full px-20 py-8">
          <div className="flex items-center gap-2 p-4">
            <FaChartLine fill="white" />
            <p className={`${font.Satoshi_b2medium} text-white`}>TRENDS</p>
          </div>
          {dataProfile ? (
            <div className="flex flex-wrap justify-center gap-6 p-0">
              {dataProfile.map((item, index) => (
                <UserContainer  index={index}
                                style={"h-24 p-6"}>
                  <Avatar username={item.username}
                          name={item.name}
                          image={item.image}
                  />
                  <ButtonFollow id={item.id}
                                isMyProfile={item.isMyProfile}
                                isFollowed={item.isFollowed}/>
                </UserContainer>
              ))}
            </div>
          ) : (
            <div className="pt-12 flex justify-center">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
