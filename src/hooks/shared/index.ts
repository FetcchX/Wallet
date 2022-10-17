import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const BASE_URL = `http://${manifest?.debuggerHost
	?.split(":")
	.shift()}:5000/graphql/`;

// const BASE_URL = "https://testnet-api.fetcch.xyz/graphql";

// const SECRET_KEY = "672dd2e6-bdef-4ceb-b71f-a6c7475054b5";
const SECRET_KEY = "e48fbcbe-33a3-424f-8b55-45a6c5e98a1a"

export const callApi = async (
  queryName: string,
  query: string,
  variables: object
) => {
  try {
    console.log("calling api");
    console.log(query);
    console.log(variables);
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
    console.log("response is this");
    console.log(res.data);

    const data = res.data;

    if (data.errors) {
      console.log("havig somer eror here ");
      throw JSON.stringify(data.errors);
    }

    return data.data[queryName];
  } catch (e) {
    console.log("some common eereor");
    console.log(JSON.stringify(e));
    throw e;
  }
};
