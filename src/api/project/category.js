export default async function Category() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/project/get/category", {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }
    }).then((res) => res.json());
    
    if(res.status === 200) {
      return {status: "200", data: res.data};
    } else {
      return {status: "err"};
    }
  } catch {
    return {status: "err"};
  }
};