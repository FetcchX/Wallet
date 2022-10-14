import BottomSheet from "@gorhom/bottom-sheet";
import { getToken } from "fetcch-chain-data";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AccountAsset } from "../componet/Assets/accountasset";
import { Asset } from "../componet/Assets/Asset";
import { HomeTop } from "../componet/HomeTop";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import { useAppContext } from "../context";
import { useId } from "../hooks/useId";
import { useNFTs } from "../hooks/useNFT";
import { COLORS } from "../styles/styles";
import { Chain } from "../componet/Assets/Chain";

export const Main = ({ navigation }: any) => {
  const { chain, chains, setChain, setNFTs } = useAppContext();

  const [num, setNum] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const TokensSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleTokenOpenPress = () => {
    if (!bottomSheetRef) return;
    (bottomSheetRef as React.MutableRefObject<BottomSheet>).current.expand();
  };

  const handleSHowAssets = () => {
    if (!TokensSheetRef) return;
    (TokensSheetRef as React.MutableRefObject<BottomSheet>).current.expand();
  };

  const { getIdNFTs } = useNFTs();

  useEffect(() => {
    getIdNFTs("testxx@fetcch.testnet")
      .then((res) => setNFTs(res))
      .catch((e) => console.error(e, "ererrerer"));
  }, []);

  return (
    <Safe>
      <Header handleTokenOpenPress={handleTokenOpenPress} />
      <View>
        <HomeTop handlre={handleSHowAssets} navigation={navigation} />
      </View>
      <BottomSheet
        style={{
          backgroundColor: COLORS.primary,
        }}
        handleStyle={{
          backgroundColor: COLORS.primary,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={num}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 10,
            backgroundColor: COLORS.secondary,
            height: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          {chains
            ?.filter((w) => w.id !== chain.id)
            .map((chain) => (
              <TouchableOpacity
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 20,
                }}
                onPress={() => {
                  setChain(chain);
                }}
              >
                <Chain image={chain.icon} name={chain.name} chainId={chain.chainId} />
              </TouchableOpacity>
            ))}
        </ScrollView>
      </BottomSheet>
      <BottomSheet
        style={{
          backgroundColor: COLORS.primary,
        }}
        handleStyle={{
          backgroundColor: COLORS.primary,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
        enablePanDownToClose={true}
        ref={TokensSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 10,
            backgroundColor: COLORS.primary,
            height: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <AccountAsset name="something" balance="something" />
          <AccountAsset name="something" balance="something" />
          <AccountAsset name="something" balance="something" />
          <AccountAsset name="something" balance="something" />
          <AccountAsset name="something" balance="something" />
          <AccountAsset name="something" balance="something" />
        </ScrollView>
      </BottomSheet>
    </Safe>
  );
};
