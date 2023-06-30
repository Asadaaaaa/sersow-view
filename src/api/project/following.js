export default async function getFollowing( auth = null, offset) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_HOST +
          "/" +
          process.env.NEXT_PUBLIC_VERSION +
          `/project/get/foryou?offset=${offset}&limit=2&following=true`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            ...(auth ? { Authorization: auth } : {}),
          },
        }
      ).then((res) => res.json());
  
      if (res.status === 200) {
        return { status: "200", data: res.data };
      } else {
        if (res.err) {
          if (res.err.type === "token") {
            if (res.err.data.code === -3 ) {
              return { status: "expired" };
            } else {
              return { status: "unauth" };
            }
          } else if (res.err.type === "service") {
            return { status: "notfound" };
          }
        } else {
          return { status: "err" };
        }
      }
    } catch {
      return { status: "err" };
    }
  }
  