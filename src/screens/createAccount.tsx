import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native";
import { size } from "superstruct";
import { COLORS, SIZES } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { CustomSheet } from "../componet/customshee";
import { handlonPress } from "../hooks/useBotomsheet";

const chains = [
	{
		logo: "E",
		name: "Ethereum Goerli",
		chainId: 5,
		internalId: 9,
	},
	{
		logo: "P",
		name: "Polygon Mumbai",
		chainId: 80001,
		internalId: 8,
	},
];

export const CreateAccount = ({ navigation }: any) => {
	const [isShowing, setIsShowing] = useState(false);
	const [num, setNum] = useState(-1);

	const [selectedChains, setSelectedChains] = useState<any>([]);

	const bottomSheetRef = useRef<BottomSheet>(null);

	// variables
	const snapPoints = useMemo(() => ["25%", "50%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleTokenOpenPress = () => {
		if (!bottomSheetRef) return;
		(
			bottomSheetRef as React.MutableRefObject<BottomSheet>
		).current.expand();
	};

	return (
		<View style={style.container}>
			<View
				style={{
					flex: 1,
					height: "100%",
				}}
			>
				<View
					style={{
						paddingVertical: 20,
						paddingHorizontal: SIZES.extralarge,
					}}
				>
					<Text style={style.headerText}>Create Account</Text>
					<View
						style={{
							paddingVertical: 20,
						}}
					>
						<Text
							style={{
								fontSize: SIZES.large,
								marginBottom: SIZES.small,
								fontFamily: "KronaOne_400Regular",
							}}
						>
							Username
						</Text>
						<TextInput
							placeholder="kid@fetcch"
							style={{
								borderRadius: 14,
								borderColor: "#000",
								borderWidth: 1,
								padding: 8,
								fontFamily: "KronaOne_400Regular",
							}}
						/>
						<Text
							style={{
								fontSize: SIZES.xsmall,
								fontFamily: "KronaOne_400Regular",
							}}
						>
							*you cannot change your username later
						</Text>
					</View>
				</View>
				<View style={style.bottom}>
					<View>
						<Text
							style={{
								marginTop: 20,
								color: "white",
								fontSize: SIZES.extralarge,
								fontFamily: "KronaOne_400Regular",
							}}
						>
							Select chain (s)
						</Text>
						<Text
							style={{
								color: "white",
								fontSize: 8,
								fontFamily: "KronaOne_400Regular",
							}}
						>
							Select chains for whom you want to create
						</Text>
						<View
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
								flexDirection: "row",
							}}
						>
							{selectedChains.map((chain: any) => (
								<TouchableOpacity
									style={{
										...style.circle,
										marginLeft: 10,
									}}
								>
									<Text
										style={{
											fontSize: SIZES.extralarge,
											fontFamily: "KronaOne_400Regular",
										}}
									>
										{chain.logo}
									</Text>
								</TouchableOpacity>
							))}
						</View>
						<TouchableOpacity
							onPress={() => {
								handleTokenOpenPress();
							}}
							style={style.button}
						>
							<Text
								style={{
									fontSize: SIZES.extralarge,
									fontFamily: "KronaOne_400Regular",
								}}
							>
								Select Chains
							</Text>
							<Ionicons
								name="md-arrow-forward-outline"
								size={24}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("home");
							}}
							style={style.next}
						>
							<Text
								style={{
									fontSize: SIZES.extralarge,
									fontFamily: "KronaOne_400Regular",
									textAlign: "center",
								}}
							>
								Next
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<BottomSheet
				enablePanDownToClose={true}
				ref={bottomSheetRef}
				index={num}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<View
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: COLORS.secondary,
						padding: 10,
					}}
				>
					{chains.map((chain) => (
						<TouchableOpacity
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								alignItems: "center",
							}}
							onPress={() => {
								console.log(selectedChains, chain);
								let value = [...selectedChains];
								value.push(chain);
								setSelectedChains(value);
							}}
						>
							<TouchableOpacity style={style.circle}>
								<Text
									style={{
										fontSize: SIZES.extralarge,
										fontFamily: "KronaOne_400Regular",
									}}
								>
									{chain.logo}
								</Text>
							</TouchableOpacity>
							<Text
								style={{
									marginLeft: 20,
									fontSize: 14,
									fontFamily: "KronaOne_400Regular",
								}}
							>
								{chain.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</BottomSheet>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
	},
	headerText: {
		fontFamily: "KronaOne_400Regular",
		padding: SIZES.extralarge,
		fontSize: SIZES.extralarge,
		textAlign: "center",
		marginTop: 10,
	},
	bottom: {
		marginTop: 140,
		fontFamily: "KronaOne_400Regular",
		backgroundColor: COLORS.primary,
		padding: SIZES.extralarge,
		borderRadius: 23,
		justifyContent: "space-between",
		height: "50%",
	},
	button: {
		marginTop: 100,
		fontFamily: "KronaOne_400Regular",
		flexDirection: "row",
		marginVertical: SIZES.xsmall,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.secondary,
		padding: SIZES.small,
	},
	next: {
		backgroundColor: "#FFFFFF",
		padding: SIZES.small,
		borderRadius: 100,
	},
	circle: {
		height: 50,
		width: 50,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		marginVertical: SIZES.small,
	},
});
