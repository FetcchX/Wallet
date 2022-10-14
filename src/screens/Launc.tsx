import { useFocusEffect } from "@react-navigation/native";
import { ethers } from "ethers";
import { useCallback } from "react";
import { AsyncStorage, Text, View } from "react-native";
import { Safe } from "../componet/shared/safe";
import { useAppContext } from "../context";
import { useId } from "../hooks/useId";
import { COLORS } from "../styles/styles";

export const Launch = ({ navigation }: any) => {
  const { getId } = useId();
  const { setId } = useAppContext();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        console.log("started")
        try {
          const a: any = await AsyncStorage.getItem("walletid");
          const id = await getId({
            id: JSON.parse(a).id,
          });
          if (!id) navigation.navigate("createAccount");
          setId(id);
          navigation.navigate("TabNavigation");
        } catch (e) {
          try {
            const a: any = await AsyncStorage.getItem("evmwallets");
            const evmWallets = JSON.parse(a)

            const message = 'wagpay did this'
            console.log(evmWallets)
            // sign message
            const wallet = new ethers.Wallet(evmWallets[0].privateKey)
            console.log(message, 'dsa')
            const currentSignature = await wallet.signMessage(message)
            
            const id = await getId({
              signedMsg: currentSignature
            })
  
            if (!id) navigation.navigate("createAccount");
            console.log(id, " id hai yaha pe ");
            setId(id);
            navigation.navigate("TabNavigation");
          } catch (e) {
            console.log(JSON.stringify(e))
            navigation.navigate("createAccount");
          }
        }
      })();
    }, [])
  );
  return (
    <Safe>
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontSize: 50,
            fontFamily: "KronaOne_400Regular",
          }}
        >
          Fetcch
        </Text>
      </View>
    </Safe>
  );
};
