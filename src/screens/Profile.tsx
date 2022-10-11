import { Text, View } from "react-native";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "../styles/styles";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { AccountAsset } from "../componet/Assets/accountasset";
import { ChainAsset } from "../componet/profile/Chain";

export const Profile = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleTokenOpenPress = () => {
    if (!bottomSheetRef) return;
    (bottomSheetRef as React.MutableRefObject<BottomSheet>).current.expand();
  };

  return (
    <>
      <Safe>
        <Header />
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: -30,
              fontSize: 25,
              fontFamily: "KronaOne_400Regular",
            }}
          >
            Profile
          </Text>
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.primary,
              height: 100,
              width: 100,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              S
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              padding: 4,
              alignItems: "center",
              backgroundColor: "#E0FFD0",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                marginHorizontal: 12,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              satyam@fetcch
            </Text>
            <TouchableOpacity>
              <MaterialIcons name="content-copy" color={"#000"} size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                fontFamily: "KronaOne_400Regular",
                marginBottom: 12,
              }}
            >
              Default Address
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleTokenOpenPress();
              }}
            >
              <View
                style={{
                  padding: 15,
                  borderRadius: 12,
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#E0FFD0",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "KronaOne_400Regular",
                  }}
                >
                  0x3565909409
                </Text>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 100,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "KronaOne_400Regular",
                fontSize: 18,
                fontWeight: "bold",
                marginVertical: 12,
              }}
            >
              Other Addresses
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleTokenOpenPress();
              }}
            >
              <View
                style={{
                  padding: 15,
                  borderRadius: 12,
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#E0FFD0",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>0x3565909409</Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      marginLeft: -12,
                      height: 30,
                      width: 30,
                      borderRadius: 100,
                      backgroundColor: "white",
                    }}
                  ></View>
                  <View
                    style={{
                      marginLeft: -4,
                      height: 30,
                      width: 30,
                      borderRadius: 100,
                      backgroundColor: "white",
                    }}
                  ></View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          style={{
            zIndex: 100,
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
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View
            style={{
              position: "relative",
              padding: 10,
              backgroundColor: COLORS.primary,
              height: "100%",
            }}
          >
            <View
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                0xlkjwdojojdw
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EAFDE0",
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}
              >
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{
                marginBottom: 60,
                position: "relative",
              }}
            >
              <ChainAsset name="Etherium" />

              <ChainAsset name="Etherium" />
              <ChainAsset name="Etherium" />
              <ChainAsset name="Etherium" />
              <ChainAsset name="Etherium" />
              <ChainAsset name="Etherium" />
            </ScrollView>
          </View>
        </BottomSheet>
      </Safe>
    </>
  );
};
