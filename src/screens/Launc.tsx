import { useFocusEffect } from "@react-navigation/native";
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
        const a: any = await AsyncStorage.getItem("walletid");
        console.log(JSON.parse(a), "ew");
        const id = await getId({
          id: JSON.parse(a).id,
        });
        if (!id) navigation.navigate("createAccount");
        console.log(id, " id hai yaha pe ");
        setId(id);
        navigation.navigate("TabNavigation");
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
