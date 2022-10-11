import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../styles/styles";

interface Props {}

export const Token = () => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "#EAFDE0",
        paddingHorizontal: 8,
        paddingVertical: 4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
      }}
      onPress={() => {
        // setToken(token);
      }}
    >
      {/* <Image
        source={{
          uri: token.logoURI,
        }}
        style={{
          width: 32,
          height: 32,
        }}
      /> */}
      <TouchableOpacity
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            marginLeft: 20,
            fontSize: 18,
            fontFamily: "KronaOne_400Regular",
          }}
        >
          Ether
        </Text>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 14,
            fontFamily: "KronaOne_400Regular",
          }}
        >
          12
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  top: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  bottom: {
    backgroundColor: COLORS.primary,
    padding: SIZES.extralarge,
    borderRadius: 23,
    justifyContent: "space-between",
    height: "45%",
  },
  button: {
    flexDirection: "row",
    marginVertical: SIZES.xsmall,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    padding: SIZES.xsmall,
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
});
