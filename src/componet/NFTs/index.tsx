import { View } from "react-native";
import { NFT } from "./NFT";

export const NFTs = () => {
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <NFT />
        <NFT />
        <NFT />
        <NFT />
      </View>
    </>
  );
};
