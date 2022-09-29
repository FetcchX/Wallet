import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import DOne from "../../../assets/logo.svg";
export const Header = () => {
  return (
    <View
      style={{
        ...headerstyles.container,
      }}
    >
      <DOne />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: SIZES.extralarge,
            marginRight: 12,
            fontWeight: "bold",
          }}
        >
          vikash
        </Text>
        <View style={headerstyles.circle}></View>
      </View>
    </View>
  );
};

const headerstyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: SIZES.xsmall,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    marginVertical: SIZES.small,
  },
});
