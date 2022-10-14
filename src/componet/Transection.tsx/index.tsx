import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";

import { SIZES } from "../../styles/styles";
import USDC from "../../../assets/usdc.svg";
export interface TransetionInfo {
  token: string
  hash: string;
  address: string;
  date: string;
  ammount: string | number;
}

export function Transection({ token, hash, address, ammount, date }: TransetionInfo) {
  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        borderRadius: 14,
        backgroundColor: "#EAFDE0",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            `https://mumbai.polygonscan.com/tx/${hash}`
          )
        }}
      >
        <View
          style={{
            marginVertical: SIZES.small,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
              style={{
                fontSize: SIZES.large,
              color: "#777E90",
              fontFamily: "KronaOne_400Regular",
              }}
            >
              Token
            </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginLeft: 5,
                fontSize: SIZES.large,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              {token}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: SIZES.small,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              color: "#777E90",
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Amount
          </Text>
          <Text
            style={{
              fontFamily: "KronaOne_400Regular",
            }}
          >
            {ammount.toString().slice(0, 4)}
          </Text>
        </View>
        <View
          style={{
            marginBottom: SIZES.small,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              color: "#777E90",
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Wallet ID
          </Text>
          <Text
            style={{
              fontFamily: "KronaOne_400Regular",
            }}
          >
            {address}
          </Text>
        </View>
        <View
          style={{
            marginBottom: SIZES.small,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              color: "#777E90",
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Date & time
          </Text>
          <Text
            style={{
              color: "#777E90",
              fontFamily: "KronaOne_400Regular",
            }}
          >
            {date}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
