import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

// const BASE_URL = `http://${manifest?.debuggerHost
// 	?.split(":")
// 	.shift()}:5000/graphql/`;

const BASE_URL = "https://testnet-api.fetcch.xyz/graphql"

export const useChain = () => {
	const getChains = async (internalId?: number): Promise<any[]> => {
		try {
			if (internalId) {
				const res = await axios({
					method: "POST",
					url: BASE_URL,
                    headers: {
                        "secret-key":"672dd2e6-bdef-4ceb-b71f-a6c7475054b5"
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
                        "secret-key":"672dd2e6-bdef-4ceb-b71f-a6c7475054b5"
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
