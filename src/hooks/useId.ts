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

export interface UserConfig {
	fromAddress: string;
	fromChain: string;
	fromId: string;
	fromToken: string;
}

export interface Request {
	toId: string;
	chain: string;
	token: string;
	amount: string;
	message: string;
	label: string;
}

const BASE_URL = `http://${manifest?.debuggerHost
	?.split(":")
	.shift()}:5000/graphql/`;

export const useId = () => {
	const { id, setId } = useAppContext();

	const findAddress = async (id: string, chain?: number) => {
		try {
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query FindAddress($data: FindAddressInput!) {
						findAddress(data: $data) {
							address
							chain {
								name
								id
								chainId
							}
						}
					}
					`,
					variables: {
						data: {
							id: id,
							fallbackToDefault: true,
						},
					},
				},
			});

			const data = await res.data;

			return data.data.findAddress;
		} catch (e) {
			console.log(e);
			throw e;
		}
	};

	const getId = async ({
		id,
		signedMsg,
	}: {
		id?: string;
		signedMsg?: string;
	}) => {
		try {
			console.log(id, "Dswwwa");
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query GetUserData($data: WalletIdWhereInput!) {
						walletIdsTestnet(where:$data) {
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
						data: {
							id,
						},
					},
				},
			});

			const data = await res.data;
			console.log(data.data.walletIdsTestnet, "das");

			return data.data.walletIdsTestnet[0];
		} catch (e) {
			console.log(JSON.stringify(e));
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
			return undefined;
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

	const getPaymentRequest = async () => {
		try {
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query {
						requests(where: { toId: { id: "${id?.id}" } }) {
							id
							toId {
								id
							}
							chain {
								id
								chainId
								name
							}
							token
							amount
							label
							message
						}
					}
					`,
				},
			});

			const data = await res.data;

			const result = data.data.requests;

			return result;
		} catch (e) {
			console.log(JSON.stringify(e));
			throw e;
		}
	};

	const createPaymentRequest = async (request: Request) => {
		try {
			console.log(request, "1");
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					mutation PaymentRequest($request: RequestCreateInput!) {
						paymentRequests(request: $request) {
							id
						}
					}
					`,
					variables: {
						request: request,
					},
				},
			});
			console.log("@");

			const data = await res.data;
			console.log(data, "Das");

			const result = data.data.paymentRequests;

			return result;
		} catch (e) {
			console.log(e);
			console.log(JSON.stringify(e));
			throw e;
		}
	};

	const buildTransaction = async (
		paymentRequestId: string,
		userConfig: UserConfig
	) => {
		console.log({
			paymentRequestId: paymentRequestId,
			userConfig: userConfig,
		});
		try {
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query BuildTransaction($data: BuildTransactionInput) {
						buildTransaction(data: $data) {
							paymentRequestId {
								id
							}
							transactionData
							userConfig {
								fromId {
									id
								}
								fromChain {
									id
								}
								fromAddress
								fromToken
							}
						}
					}
					`,
					variables: {
						data: {
							paymentRequestId: paymentRequestId,
							userConfig: userConfig,
						},
					},
				},
			});

			const data = await res.data;

			const result = data.data.buildTransaction;

			return result;
		} catch (e) {
			console.log(JSON.stringify(e));
			throw e;
		}
	};

	return {
		id,
		getId,
		generateMessage,
		createId,
		getPaymentRequest,
		buildTransaction,
		createPaymentRequest,
		findAddress,
	};
};
