import { getCookie } from "cookies-next";
import { Loading } from "@nextui-org/react";
import { useState, useEffect } from "react";

import userProject from "@/api/project/userproject";
import ContainerProject from "@/components/main/card/Project/ContainerProject";

export default function Projects({ userId }) {
  const [dataProject, setdataProject] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const res = await userProject(userId, getCookie("auth"));

      if (res) {
        if (res.status === "200") {
          setdataProject(res.data);
        }
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col justify-center px-12 gap-12 text-white">
      <div className="flex flex-col w-full h-full gap-6 ">
        {dataProject ? (
          <div className="flex flex-wrap gap-6 items-start">
            {dataProject.map((item, index) => {
              return (
                <ContainerProject index={index} data={item} />
              );
            })}
          </div>
        ) : (
          <div className="pt-12 flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
