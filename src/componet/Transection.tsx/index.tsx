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
        padding: 8,
        marginBottom: 12,
        borderRadius: 14,
        backgroundColor: "#EAFDE0",
      }}
    >
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            backgroundColor: "#515151",
            color: "white",
            justifyContent: "center",
            paddingHorizontal: 12,
            fontSize: 16,
          }}
        >
          Withdraw
        </Text>
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
          }}
        >
          Ammount
        </Text>
        <Text
          style={{
            color: "white",
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
          }}
        >
          walletID
        </Text>
        <Text
          style={{
            color: "white",
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
          }}
        >
          Date & time
        </Text>
        <Text
          style={{
            color: "#777E90",
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
}
