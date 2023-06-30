import { getCookie } from "cookies-next";
import { Loading } from "@nextui-org/react";
import { FaChartLine } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";

import font from "@/app/font.module.css";
import Category from "@/api/project/category";
import ProjectTrends from "@/api/project/projectTrends";
import { ContentFilter } from "@/components/main/discover/Context";
import styles from "@/components/main/discover/discover.module.css";
import ContainerProject from "@/components/main/card/Project/ContainerProject";

export default function Project() {

  const { projectContent } = useContext(ContentFilter);

  const [dataProject, setDataProject] = useState([]);
  const [dataProjectOdd, setDataProjectOdd] = useState([]);
  const [dataProjectEven, setDataProjectEven] = useState([]);
  const [dataCategory, setDataCategory] = useState([{ name: "All" }]);
  const [filterCategory, setFilterCategory] = useState({ name: "All" });

  async function fetchData() {
    const res = await ProjectTrends(getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        setDataProject(res.data);
      }
    }
  }

  useEffect(() => {
    if (projectContent) {
      setDataProject(projectContent);
    } else {
      fetchData();
    }
  }, [projectContent]);

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
    setDataProjectOdd([...ProjectOdd])
    setDataProjectEven([...ProjectEven])
  }, [dataProject])

  useEffect(() => {
    if (dataCategory.length !== 0) {
      setFilterCategory(dataCategory[0]);
    }
  }, [dataCategory]);

  useEffect(() => {
    async function getCategory() {
      const res = await Category();

      if (res) {
        if (res.status === "200") {
          if (dataCategory.length === 1) {
            setDataCategory([...dataCategory, ...res.data]);
          }
        }
        if (res.status === "unauth") {
          location.reload();
        }
        if (res.status === "notfound") {
          router.push("not-found");
        }
      }
    }

    getCategory();
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center px-24 mt-24 gap-12 text-white">
      <div className={`${styles.discoverCategory} flex w-full min-w-full pb-3 pt-12 gap-4 bg-gradient-b  from-slate-900/60 to-slate-900/20 backdrop-blur-md overflow-x-auto `} >
        {dataCategory.map((item) => (
          <div
            className={
              "flex justify-center items-center h-8 border border-slate-500 rounded-full py-2 px-4 whitespace-nowrap cursor-pointer " +
              (item.name === filterCategory.name
                ? "bg-slate-200 text-slate-950"
                : "bg-slate-900 text-slate-200")
            }
            onClick={() => setFilterCategory(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-full gap-6 ">
        {
          !projectContent && (
            <div className="flex items-center gap-2">
              <FaChartLine fill="white" />
              <p className={`${font.Satoshi_b2medium} text-white`}>TRENDS</p>
            </div>
          )
        }
        <div className="flex flex-wrap justify-center gap-10">
        {dataProject ? (
          <>
          <div className="flex flex-col gap-6 items-start">
            {dataProjectEven.map((item, index) => {
              if (
                item.categories
                  .map((item) => item.id)
                  .includes(filterCategory.id) ||
                filterCategory.name === "All"
              ) {
                return (
                  <ContainerProject index={index} data={item} />
                );
              }
            })}
          </div>

          <div className="flex flex-col gap-6 items-start">
            {dataProjectOdd.map((item, index) => {
              if (
                item.categories
                  .map((item) => item.id)
                  .includes(filterCategory.id) ||
                filterCategory.name === "All"
              ) {
                return (
                  <ContainerProject index={index} data={item} />
                );
              }
            })}
          </div>
          </>
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
