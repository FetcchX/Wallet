import { View, Image, Text } from "react-native";

export const NFT = ({ image, name }: { image: string; name: string }) => {
	return (
		<>
			<View
				style={{
					marginBottom: 0,
					borderRadius: 12,
					marginHorizontal: 2,
				}}
			>
				<Image
					style={{
						width: 150,
						height: 150,
					}}
					source={{
						uri: image,
					}}
					resizeMethod="resize"
					resizeMode="cover"
				/>
				<Text
					style={{
						position: "relative",
						bottom: 28,
						fontSize: 18,
						color: "white",
						paddingHorizontal: 12,
						fontFamily: "KronaOne_400Regular",
					}}
				>
					{name}
				</Text>
			</View>
		</>
	);
};
