import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#125E38",
  secondary: "#BFFAA0",
  red: "#FAA0A0",
};

export const SIZES = {
  xsmall: 10,
  small: 12,
  large: 16,
  extralarge: 18,
};

export const containerstyles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 8,
    paddingVertical: SIZES.extralarge,
    flex: 1,
  },
});

export const textStyles = StyleSheet.create({
  text: {
    color: "white",
  },
  textDark: {
    color: "#000",
  },
});

export const btn = StyleSheet.create({
  pay: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SIZES.extralarge,
    borderRadius: 100,
  },
  camcel: {
    backgroundColor: COLORS.red,
    paddingHorizontal: SIZES.extralarge,
    borderRadius: 100,
    paddingVertical: 2,
  },
});
