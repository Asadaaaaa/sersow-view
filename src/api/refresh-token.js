export default async function RefreshToken(refreshAuth) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/auth/refresh-token", {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'refreshToken': refreshAuth,
      }
    }).then((res) => res.json());
    
    if(res.status === 200) {
      return {status: "200", data: res.data};
    } else {
      if (res.err) {
        if (res.err.type === "token") {
          return {status: "guest"};
        }
      } else {
        return {status: "err"};
      }
    }
  } catch {
    return {status: "err"};
  }
};