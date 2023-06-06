"use client";

import Image from 'next/image';
import { useContext, useRef } from 'react';
import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';

import font from '@/app/font.module.css';
import CardTitle from '@/components/main/settings/CardTitle';
import { DataProfile } from '@/components/main/settings/Context';
import CardSubtitle from '@/components/main/settings/CardSubtitle';
import CardContainer from '@/components/main/settings/CardContainer';

export default function Profile() {

  const { dataProfile } = useContext(DataProfile);
  
  const [image, setImage] = useState(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProfile.image);

  const uploadAvatarRef = useRef(null);

  return (
    <div className="flex justify-center h-full">
      <div className="w-[456px] h-full pt-24">
        <div className="flex flex-col gap-6 pt-12">
          <CardContainer>
            <CardTitle title={"Avatar"} subtitle={"Unleash your good looking avatar or just use our amazing default avatar. "} />
            <CardSubtitle text={"Just drag and drop your avatar or manually choose it"} />
            <div className="flex gap-4 items-center">
              <Image 
                alt="Sersow Profile Image" 
                src={image} 
                width={96} 
                height={96} 
                className="border-solid border-slate-700 border-[1px] rounded-full"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-3 text-white">
                  <div 
                    className="flex justify-center items-center gap-2 px-[25px] py-2 bg-gradient-to-b from-[#22D3EE] to-[#0EA5E9] rounded-3xl cursor-pointer"
                    
                  >
                    <div>
                      <FaCloudUploadAlt className="w-5 h-5" />
                    </div>
                    <h3 className={`${font.Satoshi_c1bold}`}>Upload</h3>
                    <input 
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      ref={uploadAvatarRef}
                     />
                  </div>
                  <div className="p-[10px] rounded-full border-solid border-slate-300 border-[1px] cursor-pointer">
                    <FaTrashAlt className="w-4 h-4" />
                  </div>
                </div>                  
                <h3 className={`${font.Satoshi_c1regular} text-slate-400`}>File size should not exceed 1MB.</h3>
              </div>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}