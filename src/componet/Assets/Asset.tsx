import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import Logo from "../../../assets/usdc.svg";

export const Asset = ({ name, balance }: { name: string; balance: number }) => {
	return (
		<View style={AssetStyle.container}>
			<View style={AssetStyle.left}>
				<Logo
					width={40}
					style={{
						marginRight: 12,
					}}
				/>
				<View>
					<Text style={AssetStyle.token}>{name}</Text>
					<Text
						style={{
							fontSize: 8,
							fontFamily: "KronaOne_400Regular",
						}}
					>
						1 USDC = $0.99
					</Text>
				</View>
			</View>
			<View>
				<Text style={AssetStyle.price}>${balance}</Text>
			</View>
		</View>
	);
};

const AssetStyle = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		paddingVertical: 12,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "KronaOne_400Regular",
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
	},
	price: {
		fontSize: 16,
		fontFamily: "KronaOne_400Regular",
	},
	token: {
		fontSize: SIZES.large,
		fontFamily: "KronaOne_400Regular",
	},
});
