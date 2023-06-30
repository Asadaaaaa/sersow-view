import Image from 'next/image';

import { featured } from './dummy';

export default function Featured({ styles }) {
  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col xl:gap-24 relative lg:gap-20 md:gap-20 sm:gap-12 ss:gap-12">
      <div className="xl:px-24 lg:px-20 md:px-16 sm:px-12 ss:px-4">
        <Image src="/images/Featured/FeaturedTitle.png" width={1250} height={88} className="w-full hidden sm:block" />
        <Image src="/images/Featured/FeaturedMobile.png" width={1250} height={88} className="w-full block sm:hidden" />
      </div>
      <div className={`overflow-x-auto ${styles.featuredGallery}`}>
        <div className="flex w-fit gap-8 xl:px-24 lg:px-20 md:px-16 sm:px-12 ss:px-4">
          {
            featured.map((element, index) => (
              <div className="flex gap-8" key={index}>
                <div className="relative xl:w-[600px] xl:h-[400px] lg:w-[450px] lg:h-[300px] md:w-[420px] md:h-[280px] sm:w-[600px] sm:h-[400px] ss:w-[90vw] ss:h-[60vh]">
                  <Image src={element.thumbnail} alt="thumbnail" className="w-full h-full rounded-xl object-cover" />
                  <div className="absolute top-0 w-full h-full bg-slate-950/50 rounded-xl flex justify-center items-center">
                    <Image src={element.logo} alt="logo" className="w-[140px]" />
                  </div>
                </div>
                {
                  index != featured.length - 1 ? (
                    <div className="w-60 xl:h-[400px] bg-gradient-to-br from-slate-800/20 to-slate-900/20 border-solid border-[1px] border-slate-700 rounded-xl lg:h-[300px] md:h-[280px] sm:h-[400px] ss:h-[220px]"></div>
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