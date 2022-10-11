import { View, Text, Image } from "react-native";
import React from "react";

import { SIZES } from "../../styles/styles";
import USDC from "../../../assets/usdc.svg";
export interface TransetionInfo {
  hash: string;
  address: string;
  date: string;
  ammount: string | number;
}

export function Transection({ hash, address, ammount, date }: TransetionInfo) {
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
      <View
        style={{
          marginVertical: SIZES.small,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: "#515151",
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              fontSize: 16,
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Withdraw
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <USDC height={30} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: SIZES.large,
            }}
          >
            USDC
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
          Ammount
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
          walletID
        </Text>
        <Text
          style={{
            fontFamily: "KronaOne_400Regular",
          }}
        >
          {address.slice(0, 10)}
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
    </View>
  );
}
