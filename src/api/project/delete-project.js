export default async function DeleteProject(projectId, auth) {
	try {
		const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/" + process.env.NEXT_PUBLIC_VERSION + "/project/delete/" + projectId, {
			method: 'DELETE',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': auth,
			},
		}).then((res) => res.json());
		
		if (res.status === 200) {
			return {status: "200"};
		} else {
			if (res.err) {
				if (res.err.type === "token") {
					return {status: "unauth"};
				} else if (res.err.type === "service") {
					if (res.err.data.code === -1) {
						return {status: "notfound"};
					} else {
						return {status: "err"};
					}
				} else {
					return {status: "err"};
				}
			} else {
				return {status: "err"};
			}
		}
	} catch {
		return {status: "err"};
	}
};