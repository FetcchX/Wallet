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
import { useCallback, useMemo, useRef, useState } from "react";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ethers } from "ethers";
import { getChain, getChains, getTokens } from "fetcch-chain-data";
import { ScrollView } from "react-native-gesture-handler";
import { useId } from "../hooks/useId";

export const Send = ({ navigation }: any) => {
	const { id } = useId();

	const [chain, setChain] = useState(getChain({ internalId: Number(2) }));
	console.log(id?.default.chain, "DSa");
	const [token, setToken] = useState(getTokens);
	const [toId, setToId] = useState("");
	const [amount, setAmount] = useState("");
	const [message, setMessage] = useState("");

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
						color: "white",
						paddingVertical: 16,
						fontSize: 16,
						width: "70%",
					}}
				/>
				{/* <TextInput
					style={{
						fontSize: 15,
						fontFamily: "KronaOne_400Regular",
					}}
					value={toId}
					onChangeText={(text) => setToId(text)}
				/> */}
				<TextInput
					style={{
						fontSize: 15,
						fontFamily: "KronaOne_400Regular",
					}}
					value={amount}
					onChangeText={(text) => setAmount(text)}
				/>
				<Text
					style={{
						marginTop: 10,
						fontSize: 12,
						textAlign: "center",
						fontFamily: "KronaOne_400Regular",
					}}
				>
					You need to pay{" "}
					{amount && ethers.utils.formatUnits(amount, token.decimals)}{" "}
					<TextInput
						style={{
							fontSize: 15,
							fontFamily: "KronaOne_400Regular",
						}}
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>
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
					{getChains()
						.filter((c) => c.chainId !== chain?.chainId)
						.map((chain) => (
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
									{20} USC
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
									Account 1
								</Text>
							</View>
						</View>
						<Ionicons name="md-arrow-down" size={24} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("success");
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
				<Text>Accounts 🎉</Text>
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
					{getTokens(chain?.internalId).map((token: any) => (
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
							<Image
								source={{
									uri: token.logoURI,
								}}
								style={{
									width: 32,
									height: 32,
								}}
							/>
							<Text
								style={{
									marginLeft: 20,
									fontSize: 14,
									fontFamily: "KronaOne_400Regular",
								}}
							>
								{token.name}
							</Text>
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
