import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	Linking,
} from "react-native";
import { Safe } from "../componet/shared/safe";
import Done from "../../assets/done.svg";
import { COLORS, SIZES } from "../styles/styles";
import { Header } from "../componet/shared/header";
import { getChain } from "fetcch-chain-data";

export const Succesfull = ({ navigation, route }: any) => {
	return (
		<>
			<ImageBackground
				style={{
					flex: 1,
				}}
				source={require("../../assets/v.png")}
			>
				<Safe>
					<View style={style.container}>
						<Header />
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Done />
						</View>
					</View>
				</Safe>
				<View style={style.bottom}>
					<Text
						style={{
							textAlign: "center",
							fontSize: 20,
							fontFamily: "KronaOne_400Regular",
							color: "white",
						}}
					>
						{route.params.amount} {route.params.token.name} has been
						successfully sent to {route.params.toId}
					</Text>
					<View>
						<TouchableOpacity
							style={{
								...style.button,
								backgroundColor: "transparent",
								borderWidth: 2,
								borderColor: COLORS.secondary,
							}}
							onPress={() => {
								Linking.openURL(
									`${route.params.explorerUrl}/tx/${route.params.tx}`
								);
							}}
						>
							<Text
								style={{
									width: "100%",
									textAlign: "center",
									fontFamily: "KronaOne_400Regular",
									color: "white",
								}}
							>
								View Transaction
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("home");
							}}
							style={style.button}
						>
							<Text
								style={{
									width: "100%",
									textAlign: "center",
									fontFamily: "KronaOne_400Regular",
								}}
							>
								Return to Home
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</>
	);
};

const style = StyleSheet.create({
	container: {
		width: "100%",
		height: "55%",
		alignItems: "center",
		justifyContent: "space-between",
	},
	bottom: {
		backgroundColor: COLORS.primary,
		padding: SIZES.extralarge,
		borderRadius: 23,
		justifyContent: "space-around",
		height: "45%",
		width: "100%",
	},
	button: {
		width: "100%",
		flexDirection: "row",
		marginVertical: SIZES.xsmall,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.secondary,
		padding: SIZES.large,
	},
});
