import axios from "axios";
import { BigNumber, ethers } from "ethers";
import { useAppContext } from "../context";

const API_KEY = "FEX8KK9SREHZTD874Z8T82CU77NYP5I5H9";

export const useBalance = () => {
	const { id } = useAppContext();

	const getAddressNativeBalance = async (address: string, chain: string) => {
		const URL = `https://deep-index.moralis.io/api/v2/${address}/balance`;

		const params = {
			chain: ethers.utils.hexStripZeros(
				BigNumber.from(chain).toHexString()
			),
		};
		console.log(params);

		const res = await axios.get(URL, {
			params: params,
			headers: {
				"x-api-key":
					"2sGps1ah6lIVQogNYcu46kcX7pcDVR4sSTkpHjKwGG04HrBq67b7i3LsZTRyXFhF",
			},
		});

		const data = await res.data;
		console.log(data, "Das");

		return data.balance;
	};

	const getNativeBalance = async (chain: string) => {
		try {
			const addresses: string[] = [
				id?.default.address,
				id?.others.map((other) => other.address),
			].flat() as string[];
			let balance = 0;
			for (let i = 0; i < addresses.length; i++) {
				const address = addresses[i];
				const URL = `https://deep-index.moralis.io/api/v2/${address}/balance`;

				const params = {
					chain: ethers.utils.hexStripZeros(
						BigNumber.from(chain).toHexString()
					),
				};
				console.log(params);

				const res = await axios.get(URL, {
					params: params,
					headers: {
						"x-api-key":
							"2sGps1ah6lIVQogNYcu46kcX7pcDVR4sSTkpHjKwGG04HrBq67b7i3LsZTRyXFhF",
					},
				});

				const data = await res.data;
				console.log(data, "Das");

				balance += Number(ethers.utils.formatEther(data.balance));
			}

			return balance;
		} catch (e) {
			throw e;
		}
	};

	const getAddressERC20Balance = async (address: string, chain: string) => {
		try {
			const URL = `https://deep-index.moralis.io/api/v2/${address}/erc20`;

			const params = {
				chain: ethers.utils.hexStripZeros(
					BigNumber.from(chain).toHexString()
				),
			};
			console.log(params);

			const res = await axios.get(URL, {
				params: params,
				headers: {
					"x-api-key":
						"2sGps1ah6lIVQogNYcu46kcX7pcDVR4sSTkpHjKwGG04HrBq67b7i3LsZTRyXFhF",
				},
			});

			const data = await res.data;
			console.log(data);

			const list = data.map((d: any) => {
				return {
					...d,
					address: d.token_address,
				};
			});

			return list;
		} catch (e) {
			throw e;
		}
	};

	const getERC20Balance = async (chain: string) => {
		try {
			const addresses: string[] = [
				id?.default.address,
				id?.others.map((other) => other.address),
			].flat() as string[];
			let balance: any[] = [];
			for (let i = 0; i < addresses.length; i++) {
				const address = addresses[i];
				const URL = `https://deep-index.moralis.io/api/v2/${address}/erc20`;

				const params = {
					chain: ethers.utils.hexStripZeros(
						BigNumber.from(chain).toHexString()
					),
				};
				console.log(params);

				const res = await axios.get(URL, {
					params: params,
					headers: {
						"x-api-key":
							"2sGps1ah6lIVQogNYcu46kcX7pcDVR4sSTkpHjKwGG04HrBq67b7i3LsZTRyXFhF",
					},
				});

				const data = await res.data;
				console.log(data);

				for (let j = 0; j < data.length; j++) {
					const x = {
						...data[j],
						address: data[j].address,
					};

					const a = balance.indexOf(
						(i: any) => x.token_address === i.token_address
					);
					if (a > -1) {
						balance[a].balance += Number(
							ethers.utils.formatUnits(x.balance, x.decimals)
						);
					} else {
						balance.push(x);
					}
				}
			}

			return balance;
		} catch (e) {
			throw e;
		}
	};

	return {
		getNativeBalance,
		getERC20Balance,
		getAddressNativeBalance,
		getAddressERC20Balance,
	};
};
