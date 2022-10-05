import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HomeTop } from "../componet/HomeTop";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import { useAppContext } from "../context";
import { COLORS } from "../styles/styles";

export const Main = ({ navigation }: any) => {
  const { evmWallets, account, setAccount } = useAppContext();

  const [num, setNum] = useState(-1);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleTokenOpenPress = () => {
    if (!bottomSheetRef) return;
    (bottomSheetRef as React.MutableRefObject<BottomSheet>).current.expand();
  };

  return (
    <ScrollView>
      <Safe>
        <Header handleTokenOpenPress={handleTokenOpenPress} />
        <View>
          <HomeTop navigation={navigation} />
        </View>
        <BottomSheet
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
            {evmWallets
              .filter((w) => w.address !== account?.address)
              .map((wallet) => (
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
                    setAccount(wallet);
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 14,
                      fontFamily: "KronaOne_400Regular",
                    }}
                  >
                    {wallet.address.substring(0, 20)}...
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </BottomSheet>
      </Safe>
    </ScrollView>
  );
};
