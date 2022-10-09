import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const BASE_URL = `http://${manifest?.debuggerHost
	?.split(":")
	.shift()}:5000/graphql/`;

const SECRET_KEY = "cee7394a-6cb8-436e-870a-47709fd3e4b8";

export const callApi = async (
	queryName: string,
	query: string,
	variables: object
) => {
	try {
		const res = await axios({
			method: "POST",
			url: BASE_URL,
			data: {
				query,
				variables,
			},
			headers: {
				"secret-key": SECRET_KEY,
			},
		});

		const data = await res.data;

		if (data.errors) {
			throw JSON.stringify(data.errors);
		}

		return data.data[queryName];
	} catch (e) {
		console.log(JSON.stringify(e));
		throw e;
	}
};
