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
  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

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
                <Text>0x3565909409</Text>
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
          <ScrollView
            contentContainerStyle={{
              position: "relative",
              padding: 10,
              backgroundColor: COLORS.primary,
              height: "100%",
            }}
            showsVerticalScrollIndicator={false}
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
            <View
              style={{
                backgroundColor: "#EAFDE0",
                borderRadius: 10,
                padding: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="search Chain"
                style={{
                  padding: 12,
                  fontSize: 18,
                  borderRadius: 10,
                }}
                value=""
              ></TextInput>
              <MaterialIcons name="search" color={COLORS.primary} size={30} />
            </View>
            <ChainAsset name="Etherium" />

            <ChainAsset name="Etherium" />
            <ChainAsset name="Etherium" />
            <ChainAsset name="Etherium" />
            <ChainAsset name="Etherium" />
            <ChainAsset name="Etherium" />
            <TouchableOpacity
              style={{
                backgroundColor: "#EAFDE0",
                padding: 14,
                bottom: 20,
                marginVertical: 20,
                zIndex: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Add chains
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </BottomSheet>
      </Safe>
    </>
  );
};
