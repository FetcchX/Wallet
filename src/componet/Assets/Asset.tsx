import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import Logo from "../../../assets/usdc.svg";

export const Asset = () => {
  return (
    <View style={AssetStyle.container}>
      <View style={AssetStyle.left}>
        <Logo
          width={40}
          style={{
            marginRight: 12,
          }}
        />
        <View>
          <Text style={AssetStyle.token}>USDC</Text>
          <Text>1 usdc = $0.09</Text>
        </View>
      </View>
      <View>
        <Text style={AssetStyle.price}>$20000</Text>
      </View>
    </View>
  );
};

const AssetStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  token: {
    fontSize: SIZES.extralarge,
    fontWeight: "bold",
  },
});
