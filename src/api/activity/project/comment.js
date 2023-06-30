export default async function Comment(projectId, comment, auth) {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/activity/project/comment/" + projectId, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': auth,
        },
        body: JSON.stringify({
          comment: comment,
        })
      }).then(res => res.json());
      
      if(res.status === 200) {
        return {status: "200"};
      } else {
        if (res.err) {
          if (res.err.type === "validator") {
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