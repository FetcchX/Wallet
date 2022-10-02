import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import { Safe } from "../componet/shared/safe";
import Done from "../../assets/done.svg";
import { COLORS, SIZES } from "../styles/styles";
import { Header } from "../componet/shared/header";
import { getChain } from "fetcch-chain-data";

export const Succesfull = ({ navigation, route }: any) => {
  return (
    <>
      <ImageBackground
        style={{
          flex: 1,
        }}
        source={require("../../assets/v.png")}
      >
        <Safe>
          <View style={style.container}>
            <Header />
            <View
              style={{
                flex: 1,
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
                {route.params.amount} {route.params.token.name} has been
                successfully sent to {route.params.toId}
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
                onPress={() => {
                  Linking.openURL(
                    `${
                      getChain({
                        internalId: route.params.chainId,
                      })?.explorers[0].url
                    }/tx/${route.params.tx}`
                  );
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  View Transaction
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
      </ImageBackground>
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
