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
    <div className="flex flex-col items-center w-full gap-6 text-white">
      {dataProject.length !== 0 ? (
        dataProject.map((item, index) => (
          <ContainerProject index={index} data={item} />
        ))
      ) : (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
