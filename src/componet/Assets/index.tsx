import { Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import { Asset } from "./Asset";

export const Assets = ({ assets }: { assets: any[] }) => {
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
				{assets.map((asset) => (
					<Asset name={asset.symbol} balance={asset.balance} />
				))}
			</View>
		</>
	);
};
