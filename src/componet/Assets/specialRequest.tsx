import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLORS, textStyles, btn, SIZES } from "../../styles/styles";
export const SpacialRequest = () => {
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
              justifyContent: "center",
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
              borderColor: COLORS.secondary,
              borderWidth: 1,
              borderRadius: 100,
              paddingHorizontal: 16,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...textStyles.textDark,
                color: COLORS.secondary,
                fontSize: SIZES.extralarge,
              }}
            >
              View All
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
