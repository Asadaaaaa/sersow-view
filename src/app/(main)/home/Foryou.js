import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { Loading } from "@nextui-org/react";

import getForyou from "@/api/project/forYou";
import ContainerProject from "@/components/main/card/Project/ContainerProject";

export default function Foryou() {

  const [dataProject, setdataProject] = useState([]);
  const [dataProjectOdd, setdataProjectOdd] = useState([]);
  const [dataProjectEven, setdataProjectEven] = useState([]);
  
  useEffect(() => {
    const ProjectOdd = [];
    const ProjectEven = [];
    dataProject.map((item, index) => {
      index % 2 !== 0 ? (
        ProjectOdd.push(item)
      ) : (
        ProjectEven.push(item)
      )
    })
    setdataProjectOdd([...ProjectOdd])
    setdataProjectEven([...ProjectEven])
  }, [dataProject])

  useEffect(() => {
    async function fetchData() {
      const res = await getForyou(getCookie("auth"));

      if (res) {
        if (res.status === "200") {
          setdataProject(res.data);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center px-24 mt-24 gap-12 text-white">
      <div className="flex flex-wrap justify-center w-full h-full gap-6 ">
        {
          dataProject === null ? (<div className="flex justify-center"><Loading /></div>) : (
          <>
            <div className="flex flex-col gap-6 items-start">
              {dataProjectEven.map((item, index) => (
                <ContainerProject index={index} data={item}/>
              ))}
              
            </div>
            <div className="flex flex-col gap-6 items-start">
              {dataProjectOdd.map((item, index) => (
                <ContainerProject index={index} data={item} />
              ))}
              
            </div>
          </>
          )
        }
      </div>
    </div>
  );
}
