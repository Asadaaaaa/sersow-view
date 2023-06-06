"use client";

import Image from 'next/image';
import { toast } from 'react-toastify';
import { useContext, useRef, useState } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import { FaCloudUploadAlt, FaSyncAlt, FaTrashAlt } from 'react-icons/fa';

import font from '@/app/font.module.css';
import Input from '@/components/main/settings/Input';
import Textarea from '@/components/main/settings/Textarea';
import CardLabel from '@/components/main/settings/CardLabel';
import CardTitle from '@/components/main/settings/CardTitle';
import { DataProfile } from '@/components/main/settings/Context';
import CardSubtitle from '@/components/main/settings/CardSubtitle';
import CardContainer from '@/components/main/settings/CardContainer';
import CardMainButton from '@/components/main/settings/CardMainButton';

import UpdateProfile from '@/api/profile/update-profile';

export default function Profile() {

  const { dataProfile } = useContext(DataProfile);
  
  const [image, setImage] = useState(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProfile.image);
  const uploadAvatarRef = useRef(null);

  const [data, setData] = useState({
    name: dataProfile.name ? dataProfile.name : "",
    bio: dataProfile.bio ? dataProfile.bio : "",
    website: dataProfile.website ? dataProfile.website : "",
  });

  const [dataError, setDataError] = useState({
    name: false,
    bio: false,
    website: false,
  });

  const dataPattern = {
		name: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
	};

  const [warningText, setWarningText] = useState("");
  const [loading, setLoading] = useState(false);

  async function updateProfile() {

    setLoading(true);

    if (data.name === "") {
      setDataError({ ...dataError, name: true});
      setWarningText("Name can't be empty");

      setLoading(false);

      return;
    }

    if (!dataPattern.name.test(data.name)) {
      setDataError({ ...dataError, name: true});
      setWarningText("Input consists of alphabetic characters only, with words separated by a single space and no consecutive spaces");

      setLoading(false);

      return;
    }

    const finalImage = image === (process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProfile.image) ? (
      "empty"
    ) : (
      image === null ? (
        null
      ) : (
        image.split(",")[1]
      )
    );

    const res = await UpdateProfile(data.name, data.bio, data.website, finalImage, getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        toast.success("Profile Updated", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.status === "unauth") {
        deleteCookie("auth");
        deleteCookie("refreshAuth");
  
        location.reload();
      } else if (res.status === "type") {
        toast.error("Avatar type not supported", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.status === "size") {
        toast.error("Avatar size too big", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Failed to Updated Profile", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Failed to Updated Profile", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setLoading(false);
  }

  async function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise((resolve) => (reader.onload = resolve));

    return reader.result;
  }

  return (
    <div className="flex justify-center h-full">
      <div className="w-[456px] h-full pt-24">
        <div className="flex flex-col gap-6 py-12">
          <CardContainer>
            <CardTitle title={"Avatar"} subtitle={"Unleash your good looking avatar or just use our amazing default avatar."} />
            <CardSubtitle text={"Just drag and drop your avatar or manually choose it"} />
            <div className="flex gap-4 items-center">
              {
                image ? (
                  <Image 
                    alt="Sersow Profile Image" 
                    src={image} 
                    width={96} 
                    height={96} 
                    className="w-24 h-24 border-solid border-slate-700 border-[1px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 border-solid border-slate-700 border-[1px] rounded-full"></div>
                )
              }
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center gap-3 text-white">
                  <CardMainButton
                    clickHandler={() => {
                      if (uploadAvatarRef.current === null) return;

                      uploadAvatarRef.current.click();
                    }}
                  >
                    <div>
                      <FaCloudUploadAlt className="w-5 h-5" />
                    </div>
                    <h3>Upload</h3>
                    <input 
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      className="hidden"
                      ref={uploadAvatarRef}
                      onChange={async(e) => {
                        
                        if (e.target.files.length === 0) return;
                        
                        const file = e.target.files[0];
                        e.target.value = null;

                        if (file.size > 1048576) {
                          toast.error("Error: File is too big!", {
                            position: "top-center",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });

                          return;
                        }

                        const image = await getBase64(file);

                        setImage(image);
                      }}
                     />
                  </CardMainButton>
                  <div className="p-[10px] rounded-full border-solid border-slate-300 border-[1px] cursor-pointer">
                    <div
                      onClick={() => setImage(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + dataProfile.image)}
                    >
                      <FaSyncAlt className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-[10px] rounded-full border-solid border-rose-500 text-rose-500 border-[1px] cursor-pointer">
                    <div
                      onClick={() => setImage(null)}
                    >
                      <FaTrashAlt className="w-4 h-4" />
                    </div>
                  </div>
                </div>                  
                <h3 className={`${font.Satoshi_c1regular} text-slate-400`}>File size should not exceed 1MB.</h3>
              </div>
            </div>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"General"} subtitle={"Configure your profile details."} />
            <div className="flex flex-col gap-2">
              <CardLabel text={"Name"} />
              <Input 
                type={"text"} 
                placeholder={"e.g., John Doe"} 
                maxLength={60}
                value={data.name} 
                onChange={(e) => {setData({ ...data, name: e.target.value})}} 
                error={dataError.name}
                onFocus={() => {
                  setDataError({ ...dataError, name: false});
                  setWarningText("");
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardLabel text={"Personal Website URL"} />
              <Input 
                type={"text"} 
                placeholder={"e.g., https://johndoe.com"} 
                maxLength={50}
                value={data.website} 
                onChange={(e) => {setData({ ...data, website: e.target.value})}} 
                error={dataError.website}
                onFocus={() => {
                  setDataError({ ...dataError, website: false});
                  setWarningText("");
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <CardLabel text={"Bio"} />
                <CardSubtitle text={"(max. 160 characters)"} />
              </div>
              <Textarea
                type={"text"} 
                placeholder={"e.g., A master of the digital realm"} 
                maxLength={160}
                value={data.bio} 
                onChange={(e) => {setData({ ...data, bio: e.target.value})}} 
                error={dataError.bio}
                onFocus={() => {
                  setDataError({ ...dataError, bio: false});
                  setWarningText("");
                }}
              />
            </div>
            {warningText && (
              <div className="w-full max-w-[408px]">
                <p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
              </div>
            )}
            <div>
              <CardMainButton
                disabled={loading}
                clickHandler={updateProfile}
              >
                Update Profile
              </CardMainButton>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}