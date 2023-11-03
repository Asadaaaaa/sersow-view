"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { featured } from './dummy';

import ProjectFeatured from '@/api/project/project-featured';

export default function Featured({ styles }) {

  const [featuredData, setFeaturedData] = useState([]);

  const getFeaturedProject = async () => {
    const res = await ProjectFeatured();

    if (res.status === "200") {
      setFeaturedData(res.data);
    }
  }

  useEffect(() => {
    getFeaturedProject();
  }, []);

  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col xl:gap-24 relative lg:gap-20 md:gap-20 sm:gap-12 ss:gap-12">
      <div className="xl:px-24 lg:px-20 md:px-16 sm:px-12 ss:px-8">
        <Image src="/images/Featured/FeaturedTitle.png" alt="title" width={1250} height={88} className="w-full" />
      </div>
      <div className={`overflow-x-auto ${styles.featuredGallery}`}>
        <div className="flex w-fit gap-8 xl:px-24 lg:px-20 md:px-16 sm:px-12 ss:px-8">
          {
            (featuredData.length !== 0) && featuredData.map((element, index) => (
              <div className="flex gap-8" key={index}>
                <Link href={"/project/" + element.id}>
                  <div className="relative xl:w-[600px] xl:h-[400px] lg:w-[450px] lg:h-[300px] md:w-[420px] md:h-[280px] sm:w-[600px] sm:h-[400px] ss:w-[300px] ss:h-[220px] border-solid border-[1px] border-slate-700 rounded-xl">
                    <Image src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + element.thumbnail.data} width={480} height={240} alt="thumbnail" className="w-full h-full rounded-xl object-cover" loading='eager' />
                    <div className="absolute top-0 w-full h-full bg-slate-950/50 rounded-xl flex justify-center items-center">
                      <Image src={process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + element.logo} width={240} height={240} alt="logo" className="md:w-[140px] md:h-[140px] w-[100px] h-[100px] rounded-full" loading='eager' />
                    </div>
                  </div>
                </Link>
                {
                  index != featuredData.length - 1 ? (
                    <div className="md:w-60 w-20 xl:h-[400px] bg-gradient-to-br from-slate-800/20 to-slate-900/20 border-solid border-[1px] border-slate-700 rounded-xl lg:h-[300px] md:h-[280px] sm:h-[400px] ss:h-[220px]"></div>
                  ) : (
                    <></>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}