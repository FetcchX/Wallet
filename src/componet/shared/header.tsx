import { StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../styles/styles";

export const Header = () => {
  return (
    <View
      style={{
        ...headerstyles.container,
      }}
    >
      <Text>header</Text>
    </View>
  );
};

const headerstyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: SIZES.xsmall,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
