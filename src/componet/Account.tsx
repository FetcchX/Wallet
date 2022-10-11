import { StyleSheet, Text, View } from "react-native";
// import Logo from "../../../assets/usdc.svg";
import { SIZES } from "../styles/styles";

export const Account = ({
  name,
  balance,
}: {
  name: string;
  balance: string;
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#EAFDE0",
        marginVertical: 8,
      }}
    >
      <View style={AssetStyle.container}>
        <View style={AssetStyle.left}>
          <View>
            <Text style={AssetStyle.token}>Account1</Text>
            <Text
              style={{
                fontSize: 8,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              0xweijfwoijwoefjoe
            </Text>
          </View>
        </View>
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
    fontFamily: "KronaOne_400Regular",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontFamily: "KronaOne_400Regular",
  },
  token: {
    fontSize: SIZES.large,
    fontFamily: "KronaOne_400Regular",
  },
});
