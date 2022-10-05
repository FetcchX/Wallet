import { ethers } from "ethers";
import { Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import { Asset } from "./Asset";

export const Assets = ({ assets }: { assets: any[] }) => {
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
        <Asset name="USDC" balance="123" />

        <Asset name="USDC" balance="123" />
        <Asset name="USDC" balance="123" />
        <Asset name="USDC" balance="123" />

        {assets.map((asset) => (
          <Asset
            name={asset.symbol}
            balance={ethers.utils.formatUnits(asset.balance, asset.decimals)}
          />
        ))}
      </View>
    </>
  );
};
