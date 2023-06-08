export default async function DraftProject(data, auth) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/project/draft", {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': auth,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    
    if (res.status === 200) {
      return {status: "200", data: res.data};
    } else {
      if (res.err) {
        if (res.err.type === "token") {
          return {status: "unauth"};
        } else if (res.err.type === "service") {
          return {status: "servive", message: res.message};
        } else {
          return {status: "err", message: res.message};
        }
      } else {
        return {status: "err"};
      }
    }
  } catch {
    return {status: "err"};
  }
};