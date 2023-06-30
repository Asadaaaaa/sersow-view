export default async function Profile(username, auth = null) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_HOST +
        "/" +
        process.env.NEXT_PUBLIC_VERSION +
        "/profile/get/" +
        username,
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
          return { status: "unauth" };
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
