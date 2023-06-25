import { getCookie } from "cookies-next";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loading } from "@nextui-org/react";

import getFollowing from "@/api/project/following";
import ContainerProject from "@/components/main/card/Project/ContainerProject";

export default function Following() {
  const [dataProject, setdataProject] = useState([]);
  const [dataProjectOdd, setdataProjectOdd] = useState([]);
  const [dataProjectEven, setdataProjectEven] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [offSet, setOffSet] = useState(1);


  const observer = useRef()
  const lastProjectRef = useCallback(node => {
    if (isLoadMore === false) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting ) {
        setOffSet(offSet => offSet + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoadMore])

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
      const res = await getFollowing(getCookie("auth"), offSet);

      if (res) {
        if (res.status === "200") {
          if (res.data.length === 0) {
            setIsLoadMore(false);
            return;
          }
          setdataProject([...dataProject,...res.data]);
        } else if (res.status === "unauth") {
          location.reload();
        }
      }
    }
    fetchData();
  }, [offSet]);

  return (
    <div className="flex flex-col justify-center px-24 mt-24 gap-12 text-white">
      <div className="flex flex-wrap justify-center w-full h-full gap-6 ">
        {
          dataProject.length === 0 ? (<div className="flex pt-7 justify-center"><Loading /></div>) : (
            <>
          <div className="flex flex-col gap-6 items-start">
              {dataProjectEven.map((item, index) => (
              <ContainerProject index={index} data={item} refs={dataProject.length % 2 === 0 && dataProjectEven.length === index + 1 ? lastProjectRef : {}}/>
              ))}
            </div>
            <div className="flex flex-col gap-6 items-start">
              {dataProjectOdd.map((item, index) => (
                <ContainerProject index={index} data={item} refs={dataProject.length % 2 !== 0 && dataProjectEven.length === index + 1 ? lastProjectRef : {}}/>
              ))}
            </div>
            </>
            )
          }
          {
            isLoadMore === true && dataProject.length !== 0 ? (<div className="flex pt-7 justify-center"><Loading /></div>) : (<></>)
          }
      </div>
    </div>
  );
}
