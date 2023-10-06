export default async function ChangePassword(password, newPassword, auth) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/settings/account/change-password", {
      method: 'PATCH',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': auth,
      },
      body: JSON.stringify({
        password: password,
        newPassword: newPassword,
      })
    }).then((res) => res.json());
    
    if(res.status === 200) {
      return {status: "200"};
    } else {
      if (res.err) {
        if (res.err.type === "token") {
          return {status: "unauth"};
        } else if (res.err.type === "service") {
          if (res.err.data.code === -2) {
            return {status: "wrong"};
          } else if (res.err.data.code === -3) {
            return {status: "same"};
          } else {
            return {status: "err"};
          }
        }
      } else {
        return {status: "err"};
      }
    }
  } catch {
    return {status: "err"};
  }
};