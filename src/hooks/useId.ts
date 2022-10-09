import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
import { getIdData, useAppContext } from "../context";
import { callApi } from "./shared";
const { manifest } = Constants;

export interface RequestWhereInput {
	id?: number;
	payer?: WalletId;
	payee?: WalletId;
	token?: string;
	chain?: number;
	amount?: string;
	message?: string;
	label?: string;
	data?: string;
	executed?: boolean;
	transactionHash?: string;
	sameChain?: boolean;
	fromChain?: number;
	fromToken?: string;
	dstTransactionHash?: string;
}

export interface GenerateMessageWalletId {
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
	currentSignature?: string;
	previousSignature?: string;
}

export interface Chain {
	id: string;
	name: string;
	chainId: string;
}

export interface WalletId {
	id?: string;
	identifier?: string;
	provider?: {
		id?: string;
		delimiter?: string;
	};
	default?: {
		address?: string;
		chain?: Chain;
	};
	others?: {
		address?: string;
		chain?: Chain[];
	}[];
	currentSignature?: string;
	previousSignature?: string;
}

export interface UserConfig {
	fromAddress: string;
	fromChain: string;
	fromId: string;
	fromToken: string;
}

export interface Request {
	payer: string;
	payee: string;
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
		return callApi(
			"findAddress",
			`query FindAddress($data: FindAddressInput!) {
			findAddress(data: $data) {
				address
				chain {
					name
					id
					chainId
				}
			}
		}`,
			{
				data: {
					id: id,
					fallbackToDefault: true,
				},
			}
		);
	};

	const getId = async ({
		id,
		signedMsg,
	}: {
		id?: string;
		signedMsg?: string;
	}) => {
		return callApi(
			"walletId",
			`query GetUserData($data: WalletIdDataInput!) {
				walletId(data:$data) {
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
			{
				data: {
					id,
					signedMsg,
				},
			}
		);
	};

	const generateMessage = async (id: GenerateMessageWalletId) => {
		return callApi(
			"generateMessage",
			`query A($id: WalletIdCreateInput!) {
				generateMessage(id: $id) {
					message
					nonce
					walletId {
						id
						provider {
							id
							delimiter
						}
						identifier
						currentSignature
						previousSignature
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
			}`,
			{
				id: id,
			}
		);
	};

	const createId = async (id: GenerateMessageWalletId) => {
		return callApi(
			// todo
			"uploadAndIndexWalletId",
			`mutation A($data: WalletIdCreateInput!) {
				uploadAndIndexWalletId(data: $data) {
					walletId {
						id
					}
				}
			}`,
			{
				data: id,
			}
		);
	};

	const getPaymentRequest = async (where: RequestWhereInput) => {
		return callApi(
			"requests",
			`
			query Request($where: RequestWhereInput!) {
				requests(where: $where) {
					id
					payer {
					id
					}
					payee {
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
			{
				where: where,
			}
		);
		try {
			const res = await axios({
				method: "POST",
				url: BASE_URL,
				data: {
					query: `
					query {
						requestsTestnet(where: { fromId: { id: "${id?.id}" } }) {
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

			const result = data.data.requestsTestnet;

			return result;
		} catch (e) {
			console.log(JSON.stringify(e));
			throw e;
		}
	};

	const createPaymentRequest = async (request: Request) => {
		return callApi(
			"paymentRequests",
			`mutation PaymentRequest($request: RequestCreateInput!) {
				paymentRequests(request: $request) {
					id
					payer {
						id
					}
					payee {
						id
					}
					amount
					chain {
					 id
					 chainId
					 name
					}
					token
					message
					label
				}
			}`,
			{
				request,
			}
		);
	};

	const buildTransaction = async (
		paymentRequestId: string,
		userConfig: UserConfig
	) => {
		return callApi(
			"buildTransaction",
			`query BuildTransaction($data: BuildTransactionInput) {
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
			}`,
			{
				data: {
					paymentRequestId,
					userConfig,
				},
			}
		);
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
