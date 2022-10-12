import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, View } from "react-native";
import { size } from "superstruct";
import { COLORS, SIZES } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useWallet } from "../hooks";
import { useId } from "../hooks/useId";
import { useAppContext } from "../context";
import { Chain, getChains } from "fetcch-chain-data";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useChain } from "../hooks/useChain";

// interface Chain {
// 	icon: string;
// 	name: string;
// 	chainId: number;
// 	id: number;
// }

// const chains: Chain[] = [
// 	{
// 		logo: "E",
// 		name: "Ethereum Goerli",
// 		chainId: 5,
// 		internalId: 9,
// 	},
// 	{
// 		logo: "P",
// 		name: "Polygon Mumbai",
// 		chainId: 80001,
// 		internalId: 8,
// 	},
// ];

export const CreateAccount = ({ navigation }: any) => {
  const { evmWallets, setId } = useAppContext();
  const { getChains } = useChain();
  const { seedPhrase, generateSeedPhrase, generateEvmWallet } = useWallet();
  const [genwallet, setGenwallet] = useState(false);

  const { id, createId } = useId();

  const [isShowing, setIsShowing] = useState(false);
  const [num, setNum] = useState(-1);

  const [username, setUsername] = useState("");
  const [failed, setFailed] = useState(false);

  const [chains, setChains] = useState<any[]>([]);
  const [selectedChains, setSelectedChains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const create = async () => {
    const defaultAdress = evmWallets[0].address;
    const otherAddresse = evmWallets[1].address;
    const defaultChain = selectedChains[0].id;
    const otherChins = selectedChains.slice(1).map((x: any) => x.id);
    // create id
    const id = await createId({
      default: {
        address: defaultAdress,
        chain: defaultChain,
      },
      others: [
        {
          address: otherAddresse,
          chain: otherChins,
        },
      ],
      provider: "fetcch.testnet",
      identifier: username,
    });
  };

  useEffect(() => {
    (async () => {
      const totalChains = await getChains();
      setChains(totalChains);
    })();
  }, []);
  useEffect(() => {
    if (genwallet) {
      try {
        console.log(selectedChains.length);
        if (selectedChains.length > 1) {
          generateEvmWallet(2);
        } else if (selectedChains.length !== 0) {
          console.log("running this ");
          generateEvmWallet(1);
        }
      } catch (e) {
        console.log(JSON.stringify(e), "3");
        setLoading(false);
      }
    }
  }, [genwallet]);

  useEffect(() => {
    if (evmWallets && evmWallets.length > 0 && selectedChains.length > 0) {
      if (selectedChains.length > 1 && evmWallets.length > 1) {
        console.log("we are good to go");
        console.log(evmWallets);
        // get default address
        create();
      }
    } else {
      console.log("evm wallets", evmWallets);
      console.log("you have not selected chains ");
    }
  }, [evmWallets]);

  useEffect(() => {
    console.log(id, "id");
  }, [id]);

  const createWallet = () => {
    console.log(" starting here ");
    setGenwallet(true);
    try {
      setLoading(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setFailed(true);
    }
  };

  useEffect(() => {
    console.log("loading: ", loading);
  }, [loading]);

  const { getId } = useId();

  useEffect(() => {
    if (failed) {
      Alert.alert(`${username}@fetcch.testnet already exists!`);
      setFailed(false);
    }
  }, [failed]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const a: any = await AsyncStorage.getItem("walletid");
        console.log(JSON.parse(a), "ew");
        const id = await getId({
          id: JSON.parse(a).id,
        });
        if (!id) return;
        console.log(id, " id hai yaha pe ");
        setId(id);
        navigation.navigate("home");
      })();
    }, [])
  );

  return (
    <View style={style.container}>
      <View
        style={{
          flex: 1,
          height: "100%",
          marginBottom: -15,
        }}
      >
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: SIZES.extralarge,
          }}
        >
          <Text style={style.headerText}>Create Account</Text>
          <View
            style={{
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.large,
                marginBottom: SIZES.small,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              Username
            </Text>
            <TextInput
              value={username}
              placeholder="kid@fetcch"
              onChangeText={(text) => setUsername(text)}
              style={{
                borderRadius: 14,
                borderColor: "#000",
                borderWidth: 1,
                padding: 8,
                fontFamily: "KronaOne_400Regular",
              }}
            />
            <Text
              style={{
                fontSize: SIZES.xsmall,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              *you cannot change your username later
            </Text>
          </View>
        </View>
        <View style={style.bottom}>
          <View>
            <Text
              style={{
                marginTop: 20,
                color: "white",
                fontSize: SIZES.extralarge,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              Select chain (s)
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 8,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              Select chains for whom you want to create
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {selectedChains.map((chain) => (
                  <TouchableOpacity
                    style={{
                      ...style.circle,
                      marginLeft: 10,
                    }}
                    onPress={() => {
                      let value = [...selectedChains];
                      value = value.filter(
                        (c) => c.internalId !== chain.internalId
                      );
                      setSelectedChains(value);
                    }}
                  >
                    <Image
                      source={{
                        uri: chain.icon,
                      }}
                      style={{ width: 32, height: 32 }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleTokenOpenPress();
              }}
              style={style.button}
            >
              <Text
                style={{
                  fontSize: SIZES.extralarge,
                  fontFamily: "KronaOne_400Regular",
                }}
              >
                Select Chains
              </Text>
              <Ionicons name="md-arrow-forward-outline" size={24} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                createWallet();
              }}
              style={style.next}
            >
              {loading ? (
                <ActivityIndicator size={20} color="black" />
              ) : (
                <Text
                  style={{
                    fontSize: SIZES.extralarge,
                    fontFamily: "KronaOne_400Regular",
                    textAlign: "center",
                  }}
                >
                  Next
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={num}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: COLORS.primary,
        }}
        handleIndicatorStyle={{
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.primary,
            padding: 10,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {chains.map((chain: any) => (
              <TouchableOpacity
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingHorizontal: 12,
                  backgroundColor: "#BFFAA0",
                  borderRadius: 100,
                  marginBottom: 12,
                }}
                onPress={() => {
                  console.log(selectedChains, chain);
                  let value = [...selectedChains];
                  value.push(chain);
                  setSelectedChains(value);
                }}
              >
                <TouchableOpacity style={style.circle}>
                  <Image
                    source={{
                      uri: chain.icon,
                    }}
                    style={{ width: 22, height: 22 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontFamily: "KronaOne_400Regular",
                  }}
                >
                  {chain.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  headerText: {
    fontFamily: "KronaOne_400Regular",
    padding: SIZES.extralarge,
    fontSize: SIZES.extralarge,
    textAlign: "center",
    marginTop: 10,
  },
  bottom: {
    marginTop: 140,
    fontFamily: "KronaOne_400Regular",
    backgroundColor: COLORS.primary,
    padding: SIZES.extralarge,
    borderRadius: 23,
    justifyContent: "space-between",
    height: "50%",
  },
  button: {
    marginTop: 100,
    fontFamily: "KronaOne_400Regular",
    flexDirection: "row",
    marginVertical: SIZES.xsmall,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    padding: SIZES.small,
  },
  next: {
    backgroundColor: "#FFFFFF",
    padding: SIZES.small,
    borderRadius: 100,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: SIZES.small,
  },
});
