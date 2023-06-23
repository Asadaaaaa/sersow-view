"use client";

import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';
import { useState, useContext, useEffect } from 'react';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

import font from '@/app/font.module.css';
import Input from '@/components/main/settings/Input';
import CardTitle from '@/components/main/settings/CardTitle';
import CardLabel from '@/components/main/settings/CardLabel';
import { DataProfile } from '@/components/main/settings/Context';
import CardSubtitle from '@/components/main/settings/CardSubtitle';
import CardContainer from '@/components/main/settings/CardContainer';
import PopupContainer from '@/components/main/settings/PopupContainer';
import CardMainButton from '@/components/main/settings/CardMainButton';
import CardPrimaryButton from '@/components/main/settings/CardPrimaryButton';
import CardSecondaryButton from '@/components/main/settings/CardSecondaryButton';

import Username from '@/api/settings/account/username';
import AddGmail from '@/api/settings/account/gmail/add-gmail';
import ValidCode from '@/api/settings/account/gmail/valid-code';
import ResendCode from '@/api/settings/account/gmail/resend-code';
import ChangePassword from '@/api/settings/account/change-password';

export default function Account() {

  const { dataProfile } = useContext(DataProfile);

  const [usernamePopup, setUsernamePopup] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [emailVerifPopup, setEmailVerifPopup] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    emailVerif: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [dataError, setDataError] = useState({
    username: false,
    email: false,
    emailVerif: false,
    password: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [warningText, setWarningText] = useState("");
  const [passwordWarningText, setPasswordWarningText] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  const dataPattern = {
    username: /^[a-zA-Z0-9_]{1,15}$/,
    email: /[A-Za-z0-9._%+-]+@gmail\.com$/,
    password: /^\S+$/,
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

    const res = await Username(data.username, getCookie("auth"));

    if (res) {
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

        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (res.status === "unauth") {
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
      } else if (res.status === "used") {
        setDataError({ ...dataError, username: true});
        setWarningText("Username not available");

        setLoading(false);

        return;
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
    setWarningText("");
    setLoading(false);
  };

  async function addEmail() {

    setLoading(true);

    if (data.email === "") {
      setDataError({ ...dataError, email: true});
      setWarningText("Email can't be empty");

      setLoading(false);

      return;
    } 

    if (data.email.length < 11 || !dataPattern.email.test(data.email)) {
      setDataError({ ...dataError, email: true});
      setWarningText("Enter a valid Gmail address.");

      setLoading(false);

      return;
    }

    const res = await AddGmail(data.email, getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        startTimer();
        setEmailPopup(false);
        setEmailVerifPopup(true);
      } else if (res.status === "unauth") {
        location.reload();
      } else if (res.status === "verified") {
        toast.error("Email Already Verified", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (res.status === "used") {
        setDataError({ ...dataError, email: true});
        setWarningText("Email already registered. Please choose a different email address.")

        setLoading(false);

        return;
      } else {
        toast.error("Failed to Send Code", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
  
        setEmailPopup(false);
      }
    } else {
      toast.error("Failed to Send Code", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setEmailPopup(false);
    }

    setData({ ...data, email: ""});
    setWarningText("");
    setLoading(false);

  }

  async function validCode() {
    
    setLoading(true);

    if (data.emailVerif === "") {
      setDataError({ ...dataError, emailVerif: true});
      setWarningText("Verification code can't be empty");

      setLoading(false);

      return;
    } else if (data.emailVerif.length < 6) {
      setDataError({ ...dataError, emailVerif: true});
      setWarningText("Your verification code is invalid");

      setLoading(false);

      return;
    }

    const res = await ValidCode(data.emailVerif, getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        toast.success("Email Added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setEmailVerifPopup(false);

        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (res.status === "unauth") {
        location.reload();
      } else if (res.status === "wrong") {
        setDataError({ ...dataError, emailVerif: true});
        setWarningText("Your verification code is invalid");
        
        setLoading(false);
        return;
      } else if (res.status === "expired") {
        toast.warning("Your code is expired, get a new one", {
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
        toast.error("Failed to Add Email", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
  
        setEmailVerifPopup(false);
      }
    } else {
      toast.error("Failed to Add Email", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setEmailVerifPopup(false);
    }

    setData({ ...data, emailVerif: ""});
    setWarningText("");
    setLoading(false);
  }

  async function resendCode() {

    const res = await ResendCode(getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        toast.success("Resend Success", {
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
        location.reload();
      } else if (res.status === "verified") {
        toast.error("Email Already Verified", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (res.status === "cooldown") {
        toast.warning("Resend Code on Cooldown", {
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
        toast.error("Failed to Resend Code", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
  
        setEmailVerifPopup(false);
      }
    } else {
      toast.error("Failed to Resend Code", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setEmailVerifPopup(false);
    }
  }

  async function changePassword() {

    setLoading(true);

    if (data.password.length < 6 || !dataPattern.password.test(data.password)) {
      setDataError({ ...dataError, password: true});
      setPasswordWarningText("Current password is invalid");

      setLoading(false);

      return;
    }

    if (data.newPassword.length < 6) {
      setDataError({ ...dataError, newPassword: true});
      setPasswordWarningText("Minimum length for password is 6 characters");

      setLoading(false);

      return;
    }

    if (!dataPattern.password.test(data.newPassword)) {
      setDataError({ ...dataError, newPassword: true});
      setPasswordWarningText("Input should consist of a single sequence of non-whitespace characters.");

      setLoading(false);

      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setDataError({ ...dataError, newPassword: true, confirmPassword: true});
      setPasswordWarningText("Passwords can't be different");

      setLoading(false);

      return;
    }

    const res = await ChangePassword(data.password, data.newPassword, getCookie("auth"));

    if (res) {
      if (res.status === "200") {
        toast.success("Password Updated", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setData({password: "", newPassword: "", confirmPassword: ""});
      } else if (res.status === "wrong") {
        setDataError({ ...dataError, password: true});
        setPasswordWarningText("Current password is invalid");
      } else if (res.status === "same") {
        setDataError({ ...dataError, newPassword: true, confirmPassword: true});
        setPasswordWarningText("Your new password cannot be the same as your old password");
      } else {
        toast.error("Failed to Update Password", {
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
      toast.error("Failed to Update Password", {
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

  const startTimer = () => {
		setTimer(30);
		setResendDisabled(true);

		const resendInterval = setInterval(() => {
			setTimer(timer => timer - 1);
		}, 1000);

		setTimeout(() => {
			clearInterval(resendInterval);
			setTimer(0);
			setResendDisabled(false);
		}, 30000);
	};

  useEffect(() => {
		if (timer === 0) {
			setResendDisabled(false);
		}
	}, [timer]);

  return (
    <div className="flex justify-center h-full">
      <div className="w-[350px] md:w-[456px] h-full pt-24">
        <div className="flex flex-col gap-6 py-12">
          <CardContainer>
            <CardTitle title={"Username"} />
            <div className="flex flex-col gap-3">
              <CardSubtitle text={"Changing your username may cause unexpected implications."} />
              <CardPrimaryButton text={"Change Username"} clickHandler={() => setUsernamePopup(true)} />
            </div>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Emails"} />
            <div className="flex flex-col gap-1">
              <CardLabel text={"UPI mail"} />
              <CardSubtitle text={dataProfile.email_upi} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <CardLabel text={"Public mail"} />
                {
                  !dataProfile.email_gmail && (
                    <div 
                      className={`${font.Satoshi_c2bold} text-cyan-400 cursor-pointer`}
                      onClick={() => setEmailPopup(true)}
                    >
                      (Add)
                    </div>
                  )
                }
              </div>
              {
                dataProfile.email_gmail && (
                  <CardSubtitle text={dataProfile.email_gmail} />
                )
              }
            </div>
          </CardContainer>
          <CardContainer>
            <CardTitle title={"Password"} />
            <div className="flex flex-col gap-2">
              <CardLabel text={"Current password"} />
              <Input 
                type={"password"} 
                maxLength={18}
                value={data.password} 
                onChange={(e) => {setData({ ...data, password: e.target.value})}} 
                error={dataError.password}
                onFocus={() => {
                  setDataError({ ...dataError, password: false});
                  setPasswordWarningText("");
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardLabel text={"New password"} />
              <Input 
                type={"password"} 
                maxLength={18}
                value={data.newPassword} 
                onChange={(e) => {setData({ ...data, newPassword: e.target.value})}} 
                error={dataError.newPassword}
                onFocus={() => {
                  setDataError({ ...dataError, newPassword: false, confirmPassword: false});
                  setPasswordWarningText("");
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <CardLabel text={"Confirm New password"} />
              <Input 
                type={"password"} 
                maxLength={18}
                value={data.confirmPassword} 
                onChange={(e) => {setData({ ...data, confirmPassword: e.target.value})}} 
                error={dataError.confirmPassword}
                onFocus={() => {
                  setDataError({ ...dataError, newPassword: false, confirmPassword: false});
                  setPasswordWarningText("");
                }}
              />
            </div>
            {passwordWarningText && (
                <div className="w-full max-w-[302px] md:max-w-[408px]">
                  <p className={`${font.Satoshi_b2regular} text-red-500`}>{passwordWarningText}</p>
                </div>
              )}
            <div>
              <CardMainButton
                disabled={loading}
                clickHandler={changePassword}
              >
                Update Password
              </CardMainButton>
            </div>
          </CardContainer>
          {
            (usernamePopup || emailPopup || emailVerifPopup) && (
              <div className="absolute top-0 left-0 z-20 w-full h-screen flex justify-center items-center bg-slate-950/90 border-solid border-slate-700 border-r-[1px]">
                <PopupContainer>
                  {
                    usernamePopup && (
                      <>
                        <CardTitle 
                          title={"Change Username"} 
                          closable={true} 
                          closeHandler={() => {
                            setData({ ...data, username: ""});
                            setDataError({ ...dataError, username: false});
                            setWarningText("");
                            setUsernamePopup(false);
                          }} 
                        />
                        <div className="bg-rose-950/60 flex justify-center items-center gap-2 py-3 px-6 rounded-lg text-rose-400">
                          <div>
                            <FaExclamationTriangle className="w-4 h-4" />
                          </div>
                          <h3 className={`${font.Satoshi_c2bold}`}>Changing your username may cause unexpected implications.</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <CardLabel text={"Enter your new username"} />
                          <Input 
                            type={"text"} 
                            placeholder={"e.g., johndoe"} 
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
                  {
                    emailPopup && (
                      <>
                        <CardTitle 
                          title={"Add Email"} 
                          closable={true} 
                          closeHandler={() => {
                            setData({ ...data, email: ""});
                            setDataError({ ...dataError, email: false});
                            setWarningText("");
                            setEmailPopup(false);
                          }}
                        />
                        <div className="bg-cyan-950 flex justify-center items-center gap-2 py-3 px-6 rounded-lg text-cyan-400">
                          <div>
                            <FaInfoCircle className="w-4 h-4" />
                          </div>
                          <h3 className={`${font.Satoshi_c2bold}`}>A verification code will be sent to your email directly.</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <CardLabel text={"Enter your email"} />
                          <Input 
                            type={"text"} 
                            placeholder={"e.g., johndoe@gmail.com"} 
                            maxLength={40}
                            value={data.email} 
                            onChange={(e) => {setData({ ...data, email: e.target.value})}} 
                            error={dataError.email}
                            onFocus={() => {
                              setDataError({ ...dataError, email: false});
                              setWarningText("");
                            }}
                          />
                          {warningText && (
                            <div className="w-full max-w-[378.55px]">
                              <p className={`${font.Satoshi_b2regular} text-red-500`}>{warningText}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <CardPrimaryButton 
                            text={"Send Verification Code"} 
                            clickHandler={() => addEmail()}
                          />
                        </div>
                      </>
                    )
                  }
                  {
                    emailVerifPopup && (
                      <>
                        <CardTitle 
                          title={"Email Verification"} 
                          closable={true} 
                          closeHandler={() => {
                            setData({ ...data, emailVerif: ""});
                            setDataError({ ...dataError, emailVerif: false});
                            setWarningText("");
                            setEmailVerifPopup(false);
                          }}
                        />
                        <div className="bg-cyan-950 flex justify-center items-center gap-2 py-3 px-6 rounded-lg text-cyan-400">
                          <div>
                            <FaInfoCircle className="w-4 h-4" />
                          </div>
                          <h3 className={`${font.Satoshi_c2bold}`}>A verification code has been sent to your email.</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <CardLabel text={"Enter your verification code"} />
                          <Input 
                            type={"text"} 
                            placeholder={"e.g., CODE48"} 
                            maxLength={6}
                            value={data.emailVerif} 
                            onChange={(e) => {setData({ ...data, emailVerif: e.target.value})}} 
                            error={dataError.emailVerif}
                            onFocus={() => {
                              setDataError({ ...dataError, emailVerif: false});
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
                            text={"Add Email"} 
                            disabled={loading}
                            clickHandler={async() => await validCode()}
                          />
                          <CardSecondaryButton 
                            text={"Resend" + (timer !== 0 ? " (" + timer + ")" : "")} 
                            disabled={resendDisabled}
                            clickHandler={async() => {
                              startTimer();
                              await resendCode();
                            }}
                          />
                        </div>
                      </>
                    )
                  }
                </PopupContainer>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}