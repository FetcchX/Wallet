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
          marginVertical: SIZES.extralarge,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "KronaOne_400Regular",
          }}
        >
          {assets.length} Assets
        </Text>
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
