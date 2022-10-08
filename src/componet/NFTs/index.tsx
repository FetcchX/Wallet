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
          marginTop: 20,
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
