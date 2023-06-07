import Image from 'next/image';
import { toast } from 'react-toastify';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';

import font from '@/app/font.module.css';
import Input from '@/components/main/settings/Input';
import Textarea from '@/components/main/settings/Textarea';
import CardTitle from '@/components/main/settings/CardTitle';
import CardLabel from '@/components/main/settings/CardLabel';
import CardSubtitle from '@/components/main/settings/CardSubtitle';
import CardContainer from '@/components/main/settings/CardContainer';
import FileContainer from '@/components/main/settings/FileContainer';
import CardMainButton from '@/components/main/settings/CardMainButton';
import CardPrimaryButton from '@/components/main/settings/CardPrimaryButton';

import SearchUsername from '@/api/profile/search-username';

export default function Main({ category }) {

  const [data, setData] = useState({
    title: "",
    description: "",
    categories: [],
    otherCtg: "",
    thumbnail: null,
    image1: null,
    image2: null,
    image3: null,
    program: null,
    paper: null,
    code: null,
    tags: [],
    tempTags: "",
    contributors: [],
    searchContributors: [],
    tempContributors: "",
  });

  const [dataError, setDataError] = useState({
    title: false,
    description: false,
  });

  const [dataStatus, setDataStatus] = useState({
    thumbnail: "ready",
    image1: "ready",
    image2: "ready",
    image3: "ready",
    program: "ready",
    paper: "ready",
    code: "ready",
  });

  const [dataName, setDataName] = useState({
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    program: "",
    paper: "",
    code: "",
  });

  const [warningText, setWarningText] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [image, setImage] = useState(null);

  const uploadLogoRef = useRef(null);
  const uploadThumbnailRef = useRef(null);
  const uploadImage1Ref = useRef(null);
  const uploadImage2Ref = useRef(null);
  const uploadImage3Ref = useRef(null);
  const uploadProgramRef = useRef(null);
  const uploadPaperRef = useRef(null);
  const uploadCodeRef = useRef(null);

  const getCategoryIndex = (id) => (
    data.categories.findIndex(object => {
      return object === id;
    }
  ));

  const selectedCategories = data.categories;
  const selectedTags = data.tags;

  async function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise((resolve) => (reader.onload = resolve));

    return reader.result;
  }

  useEffect(() => {
    if (data.image1 === null && data.image2 !== null && data.image3 !== null) {
      setData({ ...data, image1: data.image2, image2: data.image3, image3: null });
      setDataName({ ...dataName, image1: dataName.image2, image2: dataName.image3, image3: null });
      setDataStatus({ ...dataStatus, image1: "success", image2: "success", image3: "ready" });
    } else if (data.image1 !== null && data.image2 === null && data.image3 !== null) {
      setData({ ...data, image2: data.image3, image3: null });
      setDataName({ ...dataName, image2: dataName.image3, image3: null });
      setDataStatus({ ...dataStatus, image2: "success", image3: "ready" });
    } else if (data.image1 === null && data.image2 !== null) {
      setData({ ...data, image1: data.image2, image2: null });
      setDataName({ ...data, image1: dataName.image2, image2: null });
      setDataStatus({ ...dataStatus, image1: "success", image2: "ready" });
    }
  }, [data.image1, data.image2, data.image3]);

  async function searchUsername(value) {
    const res = await SearchUsername(value, 5, getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        setData({ ...data, searchContributors: res.data});
      } else if (res.status === "unauth") {
        deleteCookie("auth");
        deleteCookie("refreshAuth");

        location.reload();
      } else {
        toast.error("Failed to fetching user", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Failed to fetching user", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    const timeout = setTimeout(async() => {
      if (data.tempContributors) {
        await searchUsername(data.tempContributors);
      } else {
        setData({ ...data, searchContributors: []});
      }
    }, 200);

    return () => {
      clearTimeout(timeout);
    }
  }, [data.tempContributors]);
  return (
    <div className="flex justify-center h-full">
      <div className="w-[456px] h-full pt-24">
        <div className="flex flex-col gap-6 py-12">
          <CardContainer>
            <CardTitle title={"Main"} subtitle={"This information is required."} />
            <div className="flex flex-col gap-2">
              <CardLabel text={"Name"} />
              <Input 
                type={"text"} 
                placeholder={"e.g., Untitled Project"} 
                maxLength={25}
                value={data.title} 
                onChange={(e) => {setData({ ...data, title: e.target.value})}} 
                error={dataError.title}
                onFocus={() => {
                  setDataError({ ...dataError, title: false});
                  setWarningText("");
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <CardLabel text={"Description"} />
                <CardSubtitle text={"(max. 700 characters)"} />
              </div>
              <Textarea
                minRows={5}
                placeholder={"e.g., This Project is made for ..."} 
                maxLength={700}
                value={data.description} 
                onChange={(e) => {setData({ ...data, description: e.target.value})}} 
                error={dataError.description}
                onFocus={() => {
                  setDataError({ ...dataError, description: false});
                  setWarningText("");
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardLabel text={"Categories"} />
              <CardSubtitle text={"Min. 1 Category and max. 3 categories."} />
              <div className="flex flex-wrap gap-2">
                {
                  category.map((item) => (
                    <div 
                      key={item.id}
                      className={`${font.Satoshi_c2bold} py-1 px-2 border-2 rounded-3xl cursor-pointer ` + (selectedCategories.includes(item.id) ? "bg-white text-slate-900" : "text-slate-100 border-slate-500 hover:bg-slate-800 hover:border-slate-400") }
                      onClick={() => {
                        if (selectedCategories.includes(item.id)) {
                          const index = getCategoryIndex(item.id);
                          const updatedCategories = [...selectedCategories];
                          let tempOther = data.otherCtg;

                          if (item.name === "Other") {
                            setIsOther(false);
                            tempOther = "";
                          }

                          updatedCategories.splice(index, 1);
                          setData({ ...data, categories: updatedCategories, otherCtg: tempOther });
                        } else {
                          if (data.categories.length < 3) {
                            setData({ ...data, categories: [...selectedCategories, item.id] });

                            if (item.name === "Other") {
                              setIsOther(true);
                            }
                          }
                        }
                      }}
                    >
                      {item.name}
                    </div>
                  ))
                }
              </div>
              {
                isOther && (
                  <Input 
                    type={"text"} 
                    placeholder={"Type new categories here..."} 
                    maxLength={15}
                    value={data.otherCtg} 
                    onChange={(e) => {setData({ ...data, otherCtg: e.target.value})}} 
                    error={dataError.otherCtg}
                    onFocus={() => {
                      setDataError({ ...dataError, otherCtg: false});
                      setWarningText("");
                    }}
                  />
                )
              }
            </div>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Logo"} subtitle={"The project main branding."} />
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
                      if (uploadLogoRef.current === null) return;

                      uploadLogoRef.current.click();
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
                      ref={uploadLogoRef}
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
                </div>                  
                <h3 className={`${font.Satoshi_c1regular} text-slate-400`}>File size should not exceed 1MB.</h3>
              </div>
            </div>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Thumbnail"} subtitle={"The face of a showcase."} />
            <FileContainer 
              subtitle={"Image (max. size 1mb)"}
              status={dataStatus.thumbnail} 
              fileName={dataName.thumbnail}
              isWithLink={false}
              clickHandler={() => {
                if (dataStatus.thumbnail === "success") return;
                if (uploadThumbnailRef.current === null) return;

                uploadThumbnailRef.current.click();
              }}
            >
              <input 
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                ref={uploadThumbnailRef}
                onChange={async(e) => {
                  try {
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

                    setData({ ...data, thumbnail: image.split(",")[1]});
                    setDataStatus({ ...dataStatus, thumbnail: "success"});
                    setDataName({ ...dataName, thumbnail: file.name});
                  } catch {
                    setDataStatus({ ...dataStatus, thumbnail: "error"});
                  }
                }}
              />
              {
                dataStatus.thumbnail === "success" && (
                  <CardPrimaryButton 
                    clickHandler={() => {
                      setData({ ...data, thumbnail: null});
                      setDataStatus({ ...dataStatus, thumbnail: "ready"})
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FaTrashAlt className="w-4 h-4" />
                      Remove
                    </div>
                  </CardPrimaryButton>
                )
              }
            </FileContainer>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Images"} subtitle={"Documentation gallery in a shape of images."} />
            <CardSubtitle text={"You can upload to max. 3 images."} />
            <FileContainer 
              subtitle={"Image with 4:3 ratio (max. size 1mb)"}
              status={dataStatus.image1} 
              fileName={dataName.image1}
              isWithLink={false}
              clickHandler={() => {
                if (dataStatus.image1 === "success") return;
                if (uploadImage1Ref.current === null) return;

                uploadImage1Ref.current.click();
              }}
            >
              <input 
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                ref={uploadImage1Ref}
                onChange={async(e) => {
                  try {
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

                    setData({ ...data, image1: image.split(",")[1]});
                    setDataStatus({ ...dataStatus, image1: "success"});
                    setDataName({ ...dataName, image1: file.name});
                  } catch {
                    setDataStatus({ ...dataStatus, image1: "error"});
                  }
                }}
              />
              {
                dataStatus.image1 === "success" && (
                  <CardPrimaryButton 
                    clickHandler={() => {
                      setData({ ...data, image1: null});
                      setDataStatus({ ...dataStatus, image1: "ready"})
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FaTrashAlt className="w-4 h-4" />
                      Remove
                    </div>
                  </CardPrimaryButton>
                )
              }
            </FileContainer>
            {
              data.image1 !== null && (
                <FileContainer 
                  subtitle={"Image with 4:3 ratio (max. size 1mb)"}
                  status={dataStatus.image2} 
                  fileName={dataName.image2}
                  clickHandler={() => {
                    if (dataStatus.image2 === "success") return;
                    if (uploadImage2Ref.current === null) return;

                    uploadImage2Ref.current.click();
                  }}
                >
                  <input 
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    ref={uploadImage2Ref}
                    onChange={async(e) => {
                      try {
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

                        setData({ ...data, image2: image.split(",")[1]});
                        setDataStatus({ ...dataStatus, image2: "success"});
                        setDataName({ ...dataName, image2: file.name});
                      } catch {
                        setDataStatus({ ...dataStatus, image2: "error"});
                      }
                    }}
                  />
                  {
                    dataStatus.image2 === "success" && (
                      <CardPrimaryButton 
                        clickHandler={() => {
                          setData({ ...data, image2: null});
                          setDataStatus({ ...dataStatus, image2: "ready"})
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <FaTrashAlt className="w-4 h-4" />
                          Remove
                        </div>
                      </CardPrimaryButton>
                    )
                  }
                </FileContainer>
              )
            }
            {
              data.image2 !== null && (
                <FileContainer 
                  subtitle={"Image with 4:3 ratio (max. size 1mb)"}
                  status={dataStatus.image3} 
                  fileName={dataName.image3}
                  clickHandler={() => {
                    if (dataStatus.image3 === "success") return;
                    if (uploadImage3Ref.current === null) return;

                    uploadImage3Ref.current.click();
                  }}
                >
                  <input 
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    ref={uploadImage3Ref}
                    onChange={async(e) => {
                      try {
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

                        setData({ ...data, image3: image.split(",")[1]});
                        setDataStatus({ ...dataStatus, image3: "success"});
                        setDataName({ ...dataName, image3: file.name});
                      } catch {
                        setDataStatus({ ...dataStatus, image3: "error"});
                      }
                    }}
                  />
                  {
                    dataStatus.image3 === "success" && (
                      <CardPrimaryButton 
                        clickHandler={() => {
                          setData({ ...data, image3: null});
                          setDataStatus({ ...dataStatus, image3: "ready"})
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <FaTrashAlt className="w-4 h-4" />
                          Remove
                        </div>
                      </CardPrimaryButton>
                    )
                  }
                </FileContainer>
              )
            }
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Files"} subtitle={"Compilation of files essential."} />
            <CardSubtitle text={"You can upload to max. 3 images."} />
            <div className="flex flex-col gap-2">
              <CardLabel text={"Program"} />
              <CardSubtitle text={"Could be the software, website, etc."} />
              <FileContainer 
                subtitle={".exe .zip (max. size 3mb)"}
                status={dataStatus.program} 
                fileName={dataName.program}
                isWithLink={true}
                value={data.program}
                onChange={(e) => {setData({ ...data, program: e.target.value})}}
                clickHandler={() => {
                  if (dataStatus.program === "success") return;
                  if (uploadProgramRef.current === null) return;

                  uploadProgramRef.current.click();
                }}
              >
                <input 
                  type="file"
                  accept="application/x-msdownload,application/zip"
                  className="hidden"
                  ref={uploadProgramRef}
                  onChange={async(e) => {
                    try {
                      if (e.target.files.length === 0) return;
                    
                      const file = e.target.files[0];
                      e.target.value = null;

                      if (file.size > 3145728) {
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

                      const program = await getBase64(file);

                      setData({ ...data, program: program.split(",")[1]});
                      setDataStatus({ ...dataStatus, program: "success"});
                      setDataName({ ...dataName, program: file.name});
                    } catch {
                      setDataStatus({ ...dataStatus, program: "error"});
                    }
                  }}
                />
                {
                  dataStatus.program === "success" && (
                    <CardPrimaryButton 
                      clickHandler={() => {
                        setData({ ...data, program: null});
                        setDataStatus({ ...dataStatus, program: "ready"})
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaTrashAlt className="w-4 h-4" />
                        Remove
                      </div>
                    </CardPrimaryButton>
                  )
                }
              </FileContainer>
            </div>
            <div className="flex flex-col gap-2">
              <CardLabel text={"Paper"} />
              <CardSubtitle text={"Could be the manual book of the project."} />
              <FileContainer 
                subtitle={".pdf (max. size 3mb)"}
                status={dataStatus.paper} 
                fileName={dataName.paper}
                isWithLink={true}
                value={data.paper}
                onChange={(e) => {setData({ ...data, paper: e.target.value})}}
                clickHandler={() => {
                  if (dataStatus.paper === "success") return;
                  if (uploadPaperRef.current === null) return;

                  uploadPaperRef.current.click();
                }}
              >
                <input 
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  ref={uploadPaperRef}
                  onChange={async(e) => {
                    try {
                      if (e.target.files.length === 0) return;
                    
                      const file = e.target.files[0];
                      e.target.value = null;

                      if (file.size > 3145728) {
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

                      const paper = await getBase64(file);

                      setData({ ...data, paper: paper.split(",")[1]});
                      setDataStatus({ ...dataStatus, paper: "success"});
                      setDataName({ ...dataName, paper: file.name});
                    } catch {
                      setDataStatus({ ...dataStatus, paper: "error"});
                    }
                  }}
                />
                {
                  dataStatus.paper === "success" && (
                    <CardPrimaryButton 
                      clickHandler={() => {
                        setData({ ...data, paper: null});
                        setDataStatus({ ...dataStatus, paper: "ready"})
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaTrashAlt className="w-4 h-4" />
                        Remove
                      </div>
                    </CardPrimaryButton>
                  )
                }
              </FileContainer>
            </div>
            <div className="flex flex-col gap-2">
              <CardLabel text={"Source Code"} />
              <CardSubtitle text={"Could be the project repository."} />
              <FileContainer 
                subtitle={".zip .rar .pdf (max. size 3mb)"}
                status={dataStatus.code} 
                fileName={dataName.code}
                isWithLink={true}
                value={data.code}
                onChange={(e) => {setData({ ...data, code: e.target.value})}}
                clickHandler={() => {
                  if (dataStatus.code === "success") return;
                  if (uploadCodeRef.current === null) return;

                  uploadCodeRef.current.click();
                }}
              >
                <input 
                  type="file"
                  accept="application/zip,application/x-rar-compressed,application/x-msdownload"
                  className="hidden"
                  ref={uploadCodeRef}
                  onChange={async(e) => {
                    try {
                      if (e.target.files.length === 0) return;
                    
                      const file = e.target.files[0];
                      e.target.value = null;

                      if (file.size > 3145728) {
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

                      const code = await getBase64(file);

                      setData({ ...data, code: code.split(",")[1]});
                      setDataStatus({ ...dataStatus, code: "success"});
                      setDataName({ ...dataName, code: file.name});
                    } catch {
                      setDataStatus({ ...dataStatus, code: "error"});
                    }
                  }}
                />
                {
                  dataStatus.code === "success" && (
                    <CardPrimaryButton 
                      clickHandler={() => {
                        setData({ ...data, code: null});
                        setDataStatus({ ...dataStatus, code: "ready"})
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaTrashAlt className="w-4 h-4" />
                        Remove
                      </div>
                    </CardPrimaryButton>
                  )
                }
              </FileContainer>
            </div>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Tags"} subtitle={"Tags could enhance content discovery and recommendations for public."} />
            <CardSubtitle text={"Max. 4 Tags"} />
            <div className="flex flex-wrap gap-2">
              {
                data.tags.map((item) => (
                  <div
                    key={item}
                    className={`${font.Satoshi_c2medium} py-1 px-2 flex gap-1 rounded-3xl bg-slate-700 text-white cursor-pointer`}
                    onClick={() => {
                      const index = getCategoryIndex(item);
                      const updatedTags = [...selectedTags];

                      updatedTags.splice(index, 1);
                      setData({ ...data, tags: updatedTags});
                    }}
                  > 
                    <div>
                      &times;
                    </div>
                    {item}
                  </div>
                ))
              }
            </div>
            <Input 
              type={"text"} 
              placeholder={"Press Enter to push tags"} 
              maxLength={12}
              value={data.tempTags} 
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                setData({ ...data, tempTags: value});
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (data.tags.length < 4) {
                    setData({ ...data, tags: [...selectedTags, data.tempTags], tempTags: "" });
                  }
                }
              }}
            />
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Contributors"} subtitle={"Give credit to other fellow contributors."} />
            {/* <CardSubtitle text={"Max. 4 Tags"} /> */}
            <div className="flex flex-col">
              <Input 
                type={"text"} 
                placeholder={"e.g., John Doe"} 
                maxLength={15}
                value={data.tempContributors} 
                onChange={(e) => setData({ ...data, tempContributors: e.target.value})}
              />
              <div className="flex flex-col mt-2 max-h-[216px] bg-slate-900 border-slate-700 border-[1px] overflow-y-auto rounded-xl">
                {
                  data.searchContributors.map((item) => (
                    <div key={item.id} className="h-[72px] flex justify-center items-center text-white">{item.name}</div>
                  ))
                }
              </div>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}