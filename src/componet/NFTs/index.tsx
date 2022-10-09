import { View } from "react-native";
import { useAppContext } from "../../context";
import { NFT } from "./NFT";

export const NFTs = () => {
	const { nfts } = useAppContext();

	return (
		<>
			<View
				style={{
					justifyContent: "center",
					flexDirection: "row",
					flexWrap: "wrap",
					marginTop: 20,
				}}
			>
				{nfts &&
					nfts.length > 0 &&
					nfts.map((nft) => (
						<NFT
							image={nft.metadata.image}
							name={
								nft.metadata.name &&
								`${nft.metadata.name.substring(0, 5)}...`
							}
						/>
					))}
			</View>
		</>
	);
};
