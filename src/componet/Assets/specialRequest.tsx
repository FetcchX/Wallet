import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useId } from "../../hooks/useId";
import { COLORS, textStyles, btn, SIZES } from "../../styles/styles";
import { getToken } from "fetcch-chain-data";
import { ethers } from "ethers";

interface Props {
	navigation: any;
}

export const SpacialRequest = ({ navigation }: Props) => {
	const { getPaymentRequest } = useId();

	const [request, setRequest] = useState<any>();

	// useEffect(() => {
	// 	const interval = setInterval(async () => {
	// 		getPaymentRequest().then((res) => {
	// 			if (res.length > 0) {
	// 				const token = getToken(res[0].token, res[0].chain.id);
	// 				setRequest({
	// 					...res[0],
	// 					token: token,
	// 				});
	// 			}
	// 		});
	// 	}, 10000);
	// 	return () => clearInterval(interval);
	// }, []);

	// useEffect(() => {
	// 	getPaymentRequest().then((res) => {
	// 		if (res.length > 0) {
	// 			const token = getToken(res[0].token, res[0].chain.id);
	// 			setRequest({
	// 				...res[0],
	// 				token: token,
	// 			});
	// 		}
	// 	});
	// }, []);

	useEffect(() => {
		console.log(request, "requ");
	}, [request]);

	if (!request) return <></>;

	return (
		<>
			{!request || request === null ? (
				<></>
			) : (
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
						Pay{" "}
						{request &&
							request.token &&
							ethers.utils.formatUnits(
								request.amount,
								request.token.decimals
							)}{" "}
						{request && request.token.name} to{" "}
						{request && request.toId.id} for “
						{request && request.label}” at{" "}
						{request && request.message}
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
								navigation.navigate("payOnRequest", {
									request: request,
								});
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
			)}
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
