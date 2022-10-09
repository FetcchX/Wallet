import { ethers } from "ethers";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SIZES } from "../../styles/styles";
import { Asset } from "./Asset";

export const Assets = ({
	assets,
	handlre,
}: {
	assets: any[];
	handlre: any;
}) => {
	return (
		<>
			<View
				style={{
					height: 500,
					width: "100%",
					marginBottom: 16,
				}}
			>
				<Text
					style={{
						fontSize: 22,
						fontFamily: "KronaOne_400Regular",
					}}
				></Text>

				{assets.map((asset) => (
					<TouchableOpacity onPress={handlre}>
						<Asset
							name={asset.symbol}
							balance={ethers.utils.formatUnits(
								asset.balance,
								asset.decimals
							)}
						/>
					</TouchableOpacity>
				))}
			</View>
		</>
	);
};
