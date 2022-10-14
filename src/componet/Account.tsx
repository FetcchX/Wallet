import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Logo from "../../../assets/usdc.svg";
import { SIZES } from "../styles/styles";

export const Account = ({
  account,
  balance,
  setAccount
}: {
  account: any;
  balance: string;
  setAccount: any
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#EAFDE0",
        marginVertical: 8,
      }}
    >
      <TouchableOpacity onPress={() => setAccount(account)} style={AssetStyle.container}>
        <View style={AssetStyle.left}>
          <View>
            <Text style={AssetStyle.token}>{account.address}</Text>
            <Text
              style={{
                fontSize: 8,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              {balance}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
