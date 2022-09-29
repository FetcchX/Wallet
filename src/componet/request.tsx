import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLORS, textStyles, btn, SIZES } from "../styles/styles";
export const Request = () => {
  return (
    <>
      <View style={style.requestcontainer}>
        <Text style={{ ...textStyles.text, textAlign: "center" }}>
          Pay 20 USDC to satyam@fetcch for “Pokemon Card” at amazon.com
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: SIZES.extralarge,
          }}
        >
          <TouchableOpacity
            style={{
              ...btn.pay,
            }}
          >
            <Text
              style={{ ...textStyles.textDark, fontSize: SIZES.extralarge }}
            >
              pay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...btn.camcel,
            }}
          >
            <Text
              style={{ ...textStyles.textDark, fontSize: SIZES.extralarge }}
            >
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  requestcontainer: {
    marginVertical: SIZES.xsmall,
    width: "95%",
    padding: SIZES.xsmall,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
});
