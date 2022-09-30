import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
import { getIdData, useAppContext } from "../context";
const { manifest } = Constants;

export interface GenerateMessageWalletId {
	id: string;
	identifier: string;
	provider: string;
	default: {
		address: string;
		chain: number;
	};
	others: {
		address: string;
		chain: number[];
	}[];
}

export interface Chain {
	id: string;
	name: string;
	chainId: string;
}

export interface WalletId {
	id: string;
	identifier: string;
	provider: {
		id: string;
		delimiter: string;
	};
	default: {
		address: string;
		chain: Chain;
	};
	others: {
		address: string;
		chain: Chain[];
	}[];
	currentSignature: string;
	previousSignature: string;
}

const BASE_URL = `http://${manifest?.debuggerHost
	?.split(":")
	.shift()}:5000/graphql/`;

export const useId = () => {
	const { id, setId } = useAppContext();

	const getId = async ({
		id,
		signedMsg,
	}: {
		id?: string;
		signedMsg?: string;
	}) => {
		try {
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query GetUserData($data: IdDataInput) {
						walletId(data: $data) {
							id
							provider {
								id
							}
							default {
								address
								chain {
									id
									name
								  icon
								  rpc
								  type
								  faucets
								  nativeCurrency { name, symbol, decimals }
								  shortName
								  infoURL
								  chainId
								  explorers { name, url, standard }
								}
							}
							others {
								address
								chain {
									id
								}
							}
							identifier
						}
					}
					`,
					variables: {
						id,
					},
				},
			});

			const data = await res.data;

			return data.data.generateMessage;
		} catch (e) {
			console.log(e);
			throw e;
		}
	};

	const generateMessage = async (id: GenerateMessageWalletId) => {
		try {
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query GenerateMessage($id: WalletIdCreateInput!, $nonce: Int!) {
						generateMessage(id: $id, nonce: $nonce) {
							message
							nonce
							walletId {
								id
								default {
									address
									chain {
										id
										name
										chainId
									}
								}
								others {
									address
									chain {
										id
										name
										chainId
									}
								}
							}
							providerSignature
						}
					}
					`,
					variables: {
						id,
					},
				},
			});

			const data = await res.data;

			return data.data.generateMessage;
		} catch (e) {
			console.log(e);
			throw e;
		}
	};

	const createId = async (id: GenerateMessageWalletId) => {
		try {
			console.log(id);

			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					mutation CreateWalletId($walletId: WalletIdCreateInput!) {
						createWalletId(walletId: $walletId) {
							id
							identifier
							provider {
								id
								delimiter
							}
							default {
								address
								chain {
									id
									name
									chainId
								}
							}
							others {
								address
								chain {
									id
									name
									chainId
								}
							}
						}
					}
					`,
					variables: {
						walletId: id,
					},
				},
			});

			const data = await res.data;
			console.log(data, "Das");
			setId(data.data.createWalletId);
			return data.data.createWalletId;
		} catch (e) {
			console.log("i am running here");
			console.log(JSON.stringify(e));
			throw e;
		}
	};

	return {
		id,
		generateMessage,
		createId,
	};
};
