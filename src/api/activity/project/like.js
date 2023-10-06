export default async function Like( projectId, auth) {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/activity/project/like/" + projectId, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': auth,
        }
      }).then((res) => res.json());
      
      if(res.status === 200) {
        return {status: "200"};
      } else {
        if (res.err) {
          if (res.err.type === "token") {
            return {status: "unauth"};
          }
        } else {
          return {status: "err"};
        }
      }
    } catch {
      return {status: "err"};
    }
  };