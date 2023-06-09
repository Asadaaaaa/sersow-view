export default async function MyDraft(auth) {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_HOST +
          "/" +
          process.env.NEXT_PUBLIC_VERSION +
          "/project/get/my/draft",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            'Authorization': auth,
          },
        }
      ).then((res) => res.json());
  
      if (res.status === 200) {
        return { status: "200", data: res.data };
      } else {
        if (res.err) {
          if (res.err.type === "token") {
            return { status: "unauth" };
          } else {
            return {status: "err"};
          }
        } else {
          return { status: "err" };
        }
      }
    } catch {
      return { status: "err" };
    }
  }
  