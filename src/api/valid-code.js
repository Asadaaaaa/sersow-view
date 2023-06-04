export default async function validCode(regAuth, code) {
  try {
    await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/auth/valid-code", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': regAuth,
      },
      body: JSON.stringify({
        code: code
      })
    }).then(res => res.json());
    
    if(res.status === 200) {
      return {status: "200", data: res.data};
    } else {
      if (res.err) {
        if (res.err.type === "token") {
          return {status: "token"};
        } else if (res.err.type === "service") {
          if (res.err.data.code === -1) {
            return {status: "-1"};
          } else if (res.err.data.code === -2) {
            return {status: "-2"}
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