import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../styles/styles";
import { Assets } from "./Assets";
import { SpacialRequest } from "./Assets/specialRequest";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBalance } from "../hooks/useBalance";
import { useCallback, useEffect, useId, useState } from "react";
import { useAppContext } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import { NFTs } from "./NFTs";

interface Props {
  navigation: any;
  handlre: any;
}

export const HomeTop = ({ navigation, handlre }: Props) => {
  const { id, chain } = useAppContext();
  const { getNativeBalance, getERC20Balance } = useBalance();
  const [balance, setBalance] = useState(0);
  const [erc20, setERC20] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState("assets");

    useEffect(() => {
      console.log(id, "Dsadasdrwhroughddhbfbcbikbj");
      id &&
        getNativeBalance(chain.chainId as string).then(
          (balance) => {
            console.log(balance);
            setBalance(balance);
          }
        ).catch(e => setBalance(0))

      getERC20Balance(chain.chainId as string).then((balance) =>
        setERC20(balance)
      ).catch(e => setERC20([]))
    }, [chain])

  return (
    <View style={style.constainer}>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...style.dash,
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../../assets/card.png")}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 27,
                  fontFamily: "KronaOne_400Regular",
                }}
              >
                M$ {balance.toFixed(3)}
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
                    fontFamily: "KronaOne_400Regular",
                  }}
                >
                  0.00% (+$0)
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#BFFAA0",
                  paddingHorizontal: 12,
                }}
                onPress={() => navigation.navigate("send")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.primary,
                    fontFamily: "KronaOne_400Regular",
                  }}
                >
                  Send
                </Text>
                <Ionicons
                  name="md-arrow-up"
                  size={30}
                  style={{
                    color: COLORS.primary,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#BFFAA0",
                  paddingHorizontal: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.primary,
                    fontFamily: "KronaOne_400Regular",
                  }}
                >
                  Recieve
                </Text>
                <Ionicons
                  size={30}
                  style={{
                    color: COLORS.primary,
                  }}
                  name="md-arrow-down"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
      <SpacialRequest navigation={navigation} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#E8FDDE",
          padding: 6,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("assets");
          }}
          style={{
            width: "50%",
            backgroundColor: currentTab == "assets" ? "white" : "#E8FDDE",
            padding: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Assets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentTab("nfts");
          }}
          style={{
            padding: 12,
            width: "50%",
            backgroundColor: currentTab == "nfts" ? "white" : "#E8FDDE",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "KronaOne_400Regular",
            }}
          >
            NFTS
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginBottom: 150,
        }}
      >
        {currentTab == "assets" ? (
          <Assets handlre={handlre} assets={erc20} />
        ) : (
          <NFTs />
        )}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {
    width: "100%",
    alignItems: "center",
    height: "100%",
  },
  dash: {
    width: "100%",
    height: 150,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    position: "relative",
    bottom: 15,
  },
});
