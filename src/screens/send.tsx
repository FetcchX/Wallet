import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
} from "react-native";
import { COLORS, SIZES } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ethers } from "ethers";
import { getChain, getChains, getToken, getTokens } from "fetcch-chain-data";
import { ScrollView } from "react-native-gesture-handler";
import { useId } from "../hooks/useId";
import { useAppContext } from "../context";
import { useBalance } from "../hooks/useBalance";
import { useChain } from "../hooks/useChain";

export const Send = ({ navigation }: any) => {
	const { getAddressERC20Balance, getAddressNativeBalance } = useBalance();
	const { id } = useId();
	const { evmWallets } = useAppContext();
	const { getChains } = useChain();

	const [chain, setChain] = useState<any>();
	const [chains, setChains] = useState<any[]>([]);
	const [token, setToken] = useState(getTokens(1)[0]);
	const [tokens, setTokens] = useState<any[]>([]);
	const [toId, setToId] = useState("");
	const [amount, setAmount] = useState("");
	const [account, setAccount] = useState(evmWallets[0]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		(async () => {
			const totalChains = await getChains();
			console.log(totalChains, "Dsadsa");
			const chain = totalChains.filter(
				(chain) => chain.id === id?.default.chain.id
			);
			setChain(chain);
			setChains(totalChains);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (chain) {
				const nativeCurrency = chain.nativeCurrency;
				const nativeBalance = await getAddressNativeBalance(
					account.address as string,
					chain.chainId.toString()
				);

				const erc20Balances = await getAddressERC20Balance(
					account.address as string,
					chain.chainId.toString()
				);

				const native = [
					{
						...nativeCurrency,
						balance: nativeBalance,
					},
					...erc20Balances,
				];

				// console.log(native, erc20Balances, "dsadsa");
				setTokens(native);
			}
		})();
	}, [chain]);

	const bottomSheetRef = useRef<BottomSheet>(null);

	const AccSheetRef = useRef<BottomSheet>(null);
	// variables
	const snapPoints = useMemo(() => ["25%", "50%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleAccountPress = () => {
		if (!AccSheetRef) return;
		(AccSheetRef as React.MutableRefObject<BottomSheet>).current.expand();
	};
	const handleTokenPress = () => {
		if (!bottomSheetRef) return;
		(
			bottomSheetRef as React.MutableRefObject<BottomSheet>
		).current.expand();
	};

	useEffect(() => {
		if (tokens.length > 0) setToken(tokens[0]);
	}, [tokens]);

	const { buildTransaction, createPaymentRequest, findAddress } = useId();

	const pay = async () => {
		// const address = await findAddress(toId);
		// console.log({
		// 	toId: toId,
		// 	chain: chain.id,
		// 	amount: ethers.utils.parseUnits(amount, token.decimals).toString(),
		// 	message: "Payment",
		// 	label: "#01",
		// 	token: token.address
		// 		? token.address
		// 		: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
		// });

		const paymentRequest = await createPaymentRequest({
			toId: toId,
			chain: chain.id,
			amount: ethers.utils.parseUnits(amount, token.decimals).toString(),
			message: "Payment",
			label: "#01",
			token: token.address
				? token.address
				: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
		});

		console.log(paymentRequest);

		const tx = await buildTransaction(paymentRequest.id, {
			fromAddress: account.address,
			fromId: id?.id as string,
			fromToken: token.address
				? token.address
				: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
			fromChain: chain.id,
		});

		let wallet = new ethers.Wallet(account.privateKey);
		wallet = wallet.connect(
			ethers.getDefaultProvider(
				"https://polygon-mumbai.g.alchemy.com/v2/Tv9MYE2mD4zn3ziBLd6S94HvLLjTocju"
			)
		);
		const sentTx = await wallet.sendTransaction(tx.transactionData);
		await sentTx.wait();
		navigation.navigate("success", {
			chainId: 7,
			tx: sentTx.hash,
			amount: amount,
			toId: toId,
			token: token,
			explorerUrl: chain.explorers[0].url,
		});
	};

	return (
		<View style={style.container}>
			<View style={style.top}>
				<View
					style={{
						...style.circle,
						marginBottom: 10,
					}}
				>
					<Text
						style={{
							fontSize: 30,
							fontFamily: "KronaOne_400Regular",
						}}
					>
						{toId.length > 0 && toId[0].toUpperCase()}
					</Text>
				</View>
				<TextInput
					defaultValue={toId}
					onChangeText={(a) => setToId(a)}
					placeholder="satyam@wagpay"
					style={{
						color: "black",
						paddingBottom: 8,
						fontSize: 16,
						width: "100%",
						textAlign: "center",
						fontFamily: "KronaOne_400Regular",
					}}
				/>
				<Text
					style={{
						marginTop: 10,
						fontSize: 12,
						textAlign: "center",
						fontFamily: "KronaOne_400Regular",
					}}
				>
					You are going to pay{" "}
				</Text>
				<TextInput
					defaultValue={amount}
					onChangeText={(a) => !isNaN(Number(a)) && setAmount(a)}
					placeholder="amount"
					style={{
						marginTop: 5,
						color:
							token &&
							token.balance &&
							Number(
								ethers.utils.formatUnits(
									token.balance,
									token.decimals
								)
							) < Number(amount)
								? "red"
								: "black",
						fontSize: 16,
						width: "70%",
						textAlign: "center",
						fontFamily: "KronaOne_400Regular",
					}}
				/>
				<Text
					style={{
						fontSize: 12,
						textAlign: "center",
						fontFamily: "KronaOne_400Regular",
					}}
				>
					{token.name}
				</Text>
			</View>
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "flex-start",
					marginTop: -30,
					marginBottom: 10,
				}}
			>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				>
					{chains &&
						chains.length > 0 &&
						chains
							.filter((c: any) => c.chainId !== chain?.chainId)
							.map((chain: any) => (
								<TouchableOpacity
									style={{
										...style.circle,
										marginHorizontal: 22,
										width: 60,
										height: 60,
									}}
									onPress={() => {
										setChain(chain);
									}}
								>
									<Image
										source={{
											uri: chain.icon,
										}}
										style={{
											width: 32,
											height: 32,
										}}
									/>
								</TouchableOpacity>
							))}
				</ScrollView>
			</View>
			<View style={{ ...style.bottom, justifyContent: "center" }}>
				<View>
					<Text
						style={{
							color: "white",
							fontFamily: "KronaOne_400Regular",
						}}
					>
						Choose Token
					</Text>
					<TouchableOpacity
						onPress={() => {
							handleTokenPress();
						}}
						style={style.button}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Image
								source={{
									uri: token.logoURI,
								}}
								style={{
									width: 32,
									height: 32,
								}}
							/>
							<View
								style={{
									marginLeft: 12,
								}}
							>
								<Text
									style={{
										fontSize: SIZES.large,
										fontFamily: "KronaOne_400Regular",
									}}
								>
									{token.name}
								</Text>
								<Text
									style={{
										fontSize: SIZES.xsmall,
										fontFamily: "KronaOne_400Regular",
									}}
								>
									{token &&
										token.balance &&
										ethers.utils.formatUnits(
											token.balance,
											token.decimals
										)}{" "}
									{token.name}
								</Text>
							</View>
						</View>
						<Ionicons name="md-arrow-down" size={24} />
					</TouchableOpacity>
					<Text
						style={{
							color: "white",
							fontFamily: "KronaOne_400Regular",
						}}
					>
						Choose Account
					</Text>
					<TouchableOpacity
						onPress={() => {
							handleAccountPress();
						}}
						style={style.button}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<View
								style={{
									...style.circle,
									height: 30,
									width: 30,
								}}
							></View>
							<View
								style={{
									marginLeft: 12,
								}}
							>
								<Text
									style={{
										fontSize: SIZES.extralarge,
										fontFamily: "KronaOne_400Regular",
									}}
								>
									{account.address.substring(0, 10)}...
								</Text>
							</View>
						</View>
						<Ionicons name="md-arrow-down" size={24} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							pay();
						}}
						style={{ ...style.button, padding: 16, marginTop: 20 }}
					>
						<Text
							style={{
								width: "100%",
								fontSize: SIZES.extralarge,
								textAlign: "center",
								fontFamily: "KronaOne_400Regular",
							}}
						>
							Pay
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<BottomSheet
				enablePanDownToClose={true}
				ref={AccSheetRef}
				index={-1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<ScrollView
					contentContainerStyle={{
						padding: 10,
						backgroundColor: COLORS.secondary,
					}}
					showsVerticalScrollIndicator={false}
				>
					{evmWallets.map((wallet) => (
						<TouchableOpacity
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "center",
								marginBottom: 10,
							}}
							onPress={() => {
								setToken(token);
							}}
						>
							<Text
								style={{
									marginLeft: 20,
									fontSize: 14,
									fontFamily: "KronaOne_400Regular",
								}}
							>
								{wallet.address.substring(0, 20)}...
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</BottomSheet>
			<BottomSheet
				enablePanDownToClose={true}
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				enableOverDrag={true}
			>
				<ScrollView
					contentContainerStyle={{
						padding: 10,
						backgroundColor: COLORS.secondary,
					}}
					showsVerticalScrollIndicator={false}
				>
					{tokens &&
						tokens.map((token: any) => (
							<TouchableOpacity
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
									marginBottom: 10,
								}}
								onPress={() => {
									setToken(token);
								}}
							>
								{/* <Image
								source={{
									uri: token.logoURI,
								}}
								style={{
									width: 32,
									height: 32,
								}}
							/> */}
								<TouchableOpacity
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "flex-start",
										alignItems: "flex-start",
									}}
									onPress={() => {
										setToken(token);
									}}
								>
									<Text
										style={{
											marginLeft: 20,
											fontSize: 18,
											fontFamily: "KronaOne_400Regular",
										}}
									>
										{token.name}
									</Text>
									<Text
										style={{
											marginLeft: 20,
											fontSize: 14,
											fontFamily: "KronaOne_400Regular",
										}}
									>
										{ethers.utils.formatUnits(
											token.balance,
											token.decimals
										)}
									</Text>
								</TouchableOpacity>
							</TouchableOpacity>
						))}
				</ScrollView>
			</BottomSheet>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		justifyContent: "space-between",
		height: "100%",
	},
	top: {
		height: "50%",
		display: "flex",
		flexDirection: "column",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 22,
	},
	bottom: {
		backgroundColor: COLORS.primary,
		padding: SIZES.extralarge,
		borderRadius: 23,
		justifyContent: "space-between",
		height: "45%",
	},
	button: {
		flexDirection: "row",
		marginVertical: SIZES.xsmall,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.secondary,
		padding: SIZES.xsmall,
	},
	circle: {
		height: 100,
		width: 100,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#D9D9D9",
	},
});
