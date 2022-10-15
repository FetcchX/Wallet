import { Alert, StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import DOne from "../../../assets/logo.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { any } from "superstruct";
import { useId } from "../../hooks/useId";
import { useWallet } from "../../hooks";
import { useAppContext } from "../../context";

export const Header = ({ handleTokenOpenPress }: any) => {
  const { id } = useId();
  const { evmWallets } = useAppContext();
  console.log(handleTokenOpenPress(), "Dsadsad");
  return (
    <View
      style={{
        ...headerstyles.container,
        marginTop: 10,
        marginBottom: 12,
      }}
    >
      <DOne />
      <TouchableOpacity onPress={() => {
              handleTokenOpenPress();
            }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.small,
              marginRight: 12,
              fontFamily: "KronaOne_400Regular",
            }}
          >
            {id?.id}
          </Text>
          <TouchableOpacity
          onPress={() => {
            handleTokenOpenPress();
          }}
            style={headerstyles.circle}
          />
        </View>
      </TouchableOpacity>
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
