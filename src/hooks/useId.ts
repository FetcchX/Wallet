import axios from "axios";

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

export const useId = () => {
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
			const res = await axios({
				method: "POST",
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
						id,
					},
				},
			});

			const data = await res.data;

			return data.data.createWalletId;
		} catch (e) {
			console.log(e);
			throw e;
		}
	};

	return {
		generateMessage,
		createId,
	};
};
