import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLORS, textStyles, btn, SIZES } from "../../styles/styles";

interface Props {
	navigation: any;
}

export const SpacialRequest = ({ navigation }: Props) => {
	return (
		<>
			<View style={style.requestcontainer}>
				<Text
					style={{
						...textStyles.text,
						fontSize: 12,
						textAlign: "center",
						fontFamily: "KronaOne_400Regular",
						marginTop: SIZES.extralarge,
					}}
				>
					Pay 20 USDC to satyam@fetcch for “Pokemon Card” at
					amazon.com
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						marginVertical: SIZES.extralarge,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("payOnRequest");
						}}
						style={{
							...btn.pay,
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								...textStyles.textDark,
								padding: 10,
								fontSize: 14,
								fontFamily: "KronaOne_400Regular",
							}}
						>
							Pay
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate("requests");
						}}
						style={{
							borderColor: COLORS.secondary,
							borderWidth: 1,
							borderRadius: 100,
							paddingHorizontal: 16,
							justifyContent: "center",
						}}
					>
						<Text
							style={{
								...textStyles.textDark,
								color: COLORS.secondary,
								fontSize: 14,
								fontFamily: "KronaOne_400Regular",
							}}
						>
							View All
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const style = StyleSheet.create({
	requestcontainer: {
		marginVertical: SIZES.xsmall,
		width: "95%",
		padding: SIZES.xsmall,
		backgroundColor: COLORS.primary,
		borderRadius: 20,
	},
});
