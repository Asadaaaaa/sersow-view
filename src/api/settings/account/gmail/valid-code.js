export default async function ValidCode(code, auth) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/settings/account/gmail/valid-code", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': auth,
      },
      body: JSON.stringify({
        'code': code,
      })
    }).then((res) => res.json());
    
    if(res.status === 200) {
      return {status: "200"};
    } else {
      if (res.err) {
        if (res.err.type === "token") {
          return {status: "unauth"};
        } else if (res.err.type === "service") {
          if (res.err.data.code === -1) {
            return {status: "wrong"};
          } else if (res.err.data.code === -2) {
            return {status: "expired"};
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