export default async function newForgotPassword(token, password) {
  try {
    await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/auth/new-forgot-password", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: token,
        password: password,
      })
    }).then(res => res.json());
    
    if(res.status === 200) {
      return {status: "200"};
    } else {
      if (res.err) {
        if (res.err.type === "service") {
          if (res.err.data.code === -1) {
            return {status: "-1"};
          }
        } else if (res.err.type === "validator") {
          return {status: "validator"};
        }
      } else {
        return {status: "err"};
      }
    }
  } catch {
    return {status: "err"};
  }
};