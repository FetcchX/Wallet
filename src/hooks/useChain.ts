import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

// const BASE_URL = `http://${manifest?.debuggerHost
// 	?.split(":")
// 	.shift()}:5000/graphql/`;

const BASE_URL = "https://testnet-api.fetcch.xyz/graphql"
const SECRET_KEY = "e48fbcbe-33a3-424f-8b55-45a6c5e98a1a"
export const useChain = () => {
	const getChains = async (internalId?: number): Promise<any[]> => {
		try {
			if (internalId) {
				const res = await axios({
					method: "POST",
					url: BASE_URL,
                    headers: {
                        "secret-key":SECRET_KEY
                    },
					data: {
						query: `
                        query Chains($id: Int!) {
                            chains(where: { id: $id }) {
                                id
                                name
                                icon
                                rpc
                                type
                                faucets
                                nativeCurrency {
                                    name
                                    decimals
                                    symbol
                                }
                                shortName
                                infoURL
                                chainId
                                explorers {
                                    url
                                    name
                                    standard
                                }
                            }
                        }
                        `,
						variables: {
							data: {
								id: internalId,
							},
						},
					},
				});

				const data = await res.data;

				return data.data.chains;
			}

			const res = await axios({
				method: "POST",
				url: BASE_URL,
                     headers: {
                        "secret-key":SECRET_KEY
                    },
				data: {
					query: `
					query Chains {
                        chains {
                            id
                            name
                            icon
                            rpc
                            type
                            faucets
                            nativeCurrency {
                                name
                                decimals
                                symbol
                            }
                            shortName
                            infoURL
                            chainId
                            explorers {
                                url
                                name
                                standard
                            }
                        }
                    }
					`,
				},
			});

			const data = await res.data;

			return data.data.chains;
		} catch (e) {
			console.log(e);
			throw e;
		}
	};

	return {
		getChains,
	};
};
