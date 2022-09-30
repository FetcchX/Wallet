import { Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import { Asset } from "./Asset";

export const Assets = () => {
	return (
		<>
			<View
				style={{
					width: "100%",
					marginVertical: SIZES.extralarge,
				}}
			>
				<Text
					style={{
						fontSize: 22,
						fontFamily: "KronaOne_400Regular",
					}}
				>
					8 Assets
				</Text>
				<Asset />
				<Asset />
				<Asset />
				<Asset />
				<Asset />
			</View>
		</>
	);
};
