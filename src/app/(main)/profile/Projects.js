import { getCookie } from 'cookies-next';
import { Loading } from '@nextui-org/react';
import { useState, useEffect } from 'react';

import font from '@/app/font.module.css';
import userProject from '@/api/project/userproject';
import ContainerProject from '@/components/main/card/Project/ContainerProject';

export default function Projects({ userId }) {
  const [dataProject, setdataProject] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await userProject(userId, getCookie("auth"));

      if (res) {
        if (res.status === "200") {
          setdataProject(res.data);
          setLoadingData(false);
        }
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col items-center w-full gap-6 text-white">
      {
        loadingData ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : dataProject.length !== 0 ? (
          dataProject.map((item, index) => (
            <ContainerProject index={index} data={item} />
          ))
        ) : (
          <h1 className={`${font.Satoshi_h4medium} text-white`}>No project at the moment.</h1>
        )
      }
    </div>
  );
}
