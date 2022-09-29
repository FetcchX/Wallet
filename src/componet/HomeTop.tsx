import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../styles/styles";
import { Assets } from "./Assets";
import { SpacialRequest } from "./Assets/specialRequest";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  navigation: any;
}

export const HomeTop = ({ navigation }: Props) => {
  return (
    <View style={style.constainer}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: "40%",
            backgroundColor: COLORS.primary,
            marginBottom: 10,
            position: "relative",
          }}
        ></View>
        <View
          style={{
            height: 15,
            width: "60%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
            marginBottom: 10,
            position: "relative",
            bottom: 8,
          }}
        ></View>
        <View
          style={{
            ...style.dash,
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 32,
              }}
            >
              $ 20,000
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="md-arrow-up-outline"
                style={{
                  transform: [{ rotate: "30deg" }],
                  color: "white",
                }}
                size={24}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: SIZES.small,
                }}
              >
                $ 20,000
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="md-arrow-up"
                size={30}
                style={{
                  color: "white",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                size={30}
                style={{
                  color: "white",
                }}
                name="md-arrow-down"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SpacialRequest navigation={navigation} />
      <Assets />
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {
    width: "100%",
    alignItems: "center",
  },
  dash: {
    width: "85%",
    height: 150,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    position: "relative",
    bottom: 15,
  },
});
