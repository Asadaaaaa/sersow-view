"use client";

import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import { useState, useContext } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import font from '@/app/font.module.css';
import Input from '@/components/main/settings/Input';
import CardTitle from '@/components/main/settings/CardTitle';
import CardLabel from '@/components/main/settings/CardLabel';
import { DataProfile } from '@/components/main/settings/Context';
import CardSubtitle from '@/components/main/settings/CardSubtitle';
import CardContainer from '@/components/main/settings/CardContainer';
import PopupContainer from '@/components/main/settings/PopupContainer';
import CardPrimaryButton from '@/components/main/settings/CardPrimaryButton';

import Username from '@/api/settings/account/username';

export default function Account() {

  const { dataProfile } = useContext(DataProfile);

  const [usernamePopup, setUsernamePopup] = useState(false);
  const [data, setData] = useState({
    username: "",
  });
  const [dataError, setDataError] = useState({
    username: false,
  });
  const [warningText, setWarningText] = useState("");
  const [loading, setLoading] = useState(false);

  const dataPattern = {
    username: /^[a-zA-Z0-9_]{1,15}$/,
  };

  async function changeUsername() {

    setLoading(true);

    if (data.username === "") {
      setDataError({ ...dataError, username: true});
      setWarningText("Username can't be empty");

      setLoading(false);

      return;
    }

    if (!dataPattern.username.test(data.username)) {
      setDataError({ ...dataError, username: true});
      setWarningText("Input consists of alphanumeric characters or underscores.");

      setLoading(false);

      return;
    }

    const res = await Username(dataProfile.username, getCookie("auth"));

    if (res.status === "200") {
      toast.success("Username Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setUsernamePopup(false);
    } else if (res.status === "unauth") {
      deleteCookie("auth");
      deleteCookie("refreshAuth");

      location.reload();
    } else if (res.status === "notchange") {
      toast.warning("New username must be different from old username", {
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
      toast.error("Failed to Change Username", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setUsernamePopup(false);
    }

    setData({ ...data, username: ""});
    setLoading(false);
  };

  return (
    <div className="flex justify-center h-full">
      <div className="w-[456px] h-full pt-24">
        <div className="flex flex-col gap-6 pt-12">
          <CardContainer>
            <CardTitle title={"Username"} />
            <div className="flex flex-col gap-3">
              <CardSubtitle text={"Changing your username may cause unexpected implications."} />
              <CardPrimaryButton text={"Change Username"} clickHandler={() => setUsernamePopup(true)} />
            </div>
          </CardContainer>
          {
            (usernamePopup) && (
              <div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/50 border-solid border-slate-700 border-r-[1px]">
                <PopupContainer>
                  {
                    usernamePopup && (
                      <>
                        <CardTitle title={"Change Username"} closable={true} closeHandler={() => setUsernamePopup(false)} />
                        <div className="bg-rose-950/60 flex justify-center items-center gap-2 py-3 px-6 rounded-lg text-rose-400">
                          <div>
                            <FaExclamationTriangle className="w-4 h-4" />
                          </div>
                          <h3 className={`${font.Satoshi_c2bold}`}>Altering your username may cause unexpected implications.</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <CardLabel text={"Enter your new username"} />
                          <Input 
                            type={"text"} 
                            placeholder={"e.g., John Doe"} 
                            maxLength={15}
                            value={data.username} 
                            onChange={(e) => {setData({ ...data, username: e.target.value})}} 
                            error={dataError.username}
                            onFocus={() => {
                              setDataError({ ...dataError, username: false});
                              setWarningText("");
                            }}
                          />
                          {warningText && (
                            <div className="w-full">
                              <p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <CardPrimaryButton 
                            text={"Update Username"} 
                            disabled={loading}
                            clickHandler={async() => await changeUsername()}
                          />
                        </div>
                      </>
                    )
                  }
                </PopupContainer>
              </div>
            )
          }
          <CardContainer>
            <CardTitle title={"Emails"} />
            <div className="flex flex-col gap-1">
              <CardLabel text={"UPI mail"} />
              <CardSubtitle text={"dummy@upi.edu"} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <CardLabel text={"Public mail"} />
                <div className={`${font.Satoshi_c2bold} text-cyan-400 cursor-pointer`}>(Add)</div>
              </div>
              {/* <CardSubtitle text={"dummy@gmail.com"} /> */}
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}