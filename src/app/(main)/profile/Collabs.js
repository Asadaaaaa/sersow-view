import { getCookie } from "cookies-next";
import { Loading } from "@nextui-org/react";
import { useState, useEffect } from "react";

import getCollabProject from "@/api/project/collabproject";
import ContainerProject from "@/components/main/card/Project/ContainerProject";

export default function Collabs({ userId }) {
  const [dataProject, setdataProject] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getCollabProject(userId, getCookie("auth"));

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
        {dataProject.length !== 0 ? (
          <div className="flex flex-wrap gap-6 items-start">
            {dataProject.map((item, index) => {
              return (
                <ContainerProject index={index} data={item} />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
