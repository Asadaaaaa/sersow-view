export default async function login(identity, password) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/auth/login", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: identity,
        password: password,
      })
    }).then((res) => res.json());
    
    if(res.status === 200) {
      return {status: "200", data: res.data};
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