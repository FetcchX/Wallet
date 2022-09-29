import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export const PyaonRequest = ({ navigation }: any) => {
  return (
    <View style={style.container}>
      <View style={style.top}>
        <View style={style.circle}>
          <Text
            style={{
              fontSize: 30,
            }}
          >
            A
          </Text>
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          amazon@fetcch
        </Text>
        <Text
          style={{
            fontSize: SIZES.large,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          You need to pay 20 USDC for “Pokenmon Card”
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              ...style.circle,
              width: 60,
              height: 60,
              marginTop: SIZES.extralarge,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>E</Text>
          </View>
        </View>
      </View>
      <View style={{ ...style.bottom, justifyContent: "center" }}>
        <View>
          <Text
            style={{
              color: "white",
            }}
          >
            choose Token
          </Text>
          <TouchableOpacity style={style.button}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...style.circle,
                  height: 30,
                  width: 30,
                }}
              ></View>
              <View
                style={{
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: SIZES.large,
                  }}
                >
                  USDC
                </Text>
                <Text
                  style={{
                    fontSize: SIZES.xsmall,
                  }}
                >
                  20 usdc
                </Text>
              </View>
            </View>
            <Ionicons name="md-arrow-down" size={24} />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
            }}
          >
            choose Account
          </Text>
          <TouchableOpacity style={style.button}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  ...style.circle,
                  height: 30,
                  width: 30,
                }}
              ></View>
              <View
                style={{
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: SIZES.extralarge,
                  }}
                >
                  Account 1
                </Text>
              </View>
            </View>
            <Ionicons name="md-arrow-down" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("success");
            }}
            style={{ ...style.button, padding: 16, marginTop: 20 }}
          >
            <Text
              style={{
                width: "100%",
                fontSize: SIZES.extralarge,
                textAlign: "center",
              }}
            >
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  top: {
    height: "50%",
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
