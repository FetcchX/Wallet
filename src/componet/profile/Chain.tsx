import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../styles/styles";
import Logo from "../../../assets/usdc.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

export const ChainAsset = ({
  name,
  icon,
  chainId,
  active,
}: {
  chainId: string;
  name: string;
  icon: string;
  active: boolean;
}) => {
  useEffect(() => {
    console.log("active", active, chainId);
  });
  return (
    <TouchableOpacity>
      <View
        style={{
          width: "100%",
          backgroundColor: "#EAFDE0",
          marginVertical: 8,
        }}
      >
        <View style={AssetStyle.container}>
          <View style={AssetStyle.left}>
            <Image
              style={{ width: 26, height: 26, marginRight: 12 }}
              source={{
                uri: icon,
              }}
            />
            <View>
              <Text style={AssetStyle.token}>{name.slice(0, 20)}</Text>
            </View>
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: COLORS.secondary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {active ? "-" : "+"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 14,
    fontFamily: "KronaOne_400Regular",
  },
});
