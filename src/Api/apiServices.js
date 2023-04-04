export const FetchGetApi = async (path) => {
	let token_Data = "";
	if (localStorage.getItem("strusertoken")) {
		token_Data = localStorage.getItem("strusertoken");
	}
	let headers = { Authorization: token_Data };
	const GetApiData = await fetch(path, { headers: headers })
		.then((response) => {
			return response;
		})
		.catch((err) => {
			return err.response;
		});
	return GetApiData;
};

export const FetchPostApi = async (path, body) => {
	let token_Data = "";
	if (localStorage.getItem("strusertoken")) {
		token_Data = localStorage.getItem("strusertoken");
	}
	const options = { method: "POST", headers: { Authorization: token_Data, "Content-Type": "application/json" }, body: JSON.stringify(body) };
	const PostApiData = await fetch(path, options)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			return err.response;
		});
	return PostApiData;
};

export const ImagePostApi = async (path, body) => {
	let token_Data = "";
	if (localStorage.getItem("strusertoken")) {
		token_Data = localStorage.getItem("strusertoken");
	}
	const options = { method: "POST", headers: { Authorization: token_Data}, body: body };
	const PostApiData = await fetch(path, options)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			return err.response;
		});
	return PostApiData;
};
