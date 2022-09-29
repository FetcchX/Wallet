import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Safe } from "../componet/shared/safe";
import Done from "../../assets/done.svg";
import { COLORS, SIZES } from "../styles/styles";
import { Header } from "../componet/shared/header";

export const Succesfull = ({ navigation }: any) => {
  return (
    <>
      <Safe>
        <View style={style.container}>
          <Header />
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Done />
            <Text
              style={{
                textAlign: "center",
                fontSize: SIZES.extralarge,
              }}
            >
              20 USDC has been successfully sent to amazon@fetcch
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                ...style.button,
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: COLORS.secondary,
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                View Transection
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("home");
              }}
              style={style.button}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Return to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Safe>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    marginVertical: SIZES.xsmall,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    padding: SIZES.large,
  },
});
