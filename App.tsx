import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "@ethersproject/shims";

import React, { useCallback, useEffect } from "react";
import { Safe } from "./src/componet/shared/safe";
import { Asset } from "./src/componet/Assets/Asset";
import { Assets } from "./src/componet/Assets";
import { SpacialRequest } from "./src/componet/Assets/specialRequest";
import { CreateAccount } from "./src/screens/createAccount";
import { PyaonRequest } from "./src/screens/payonRequest";
import { Header } from "./src/componet/shared/header";
import { Succesfull } from "./src/screens/success";
import { Requests } from "./src/screens/requests";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./src/screens/Home";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AsyncStorage, ImageBackground } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, KronaOne_400Regular } from "@expo-google-fonts/krona-one";
import { AppContextProvider } from "./src/context";
const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    KronaOne_400Regular,
  });

  useEffect(() => {
    AsyncStorage.setItem("walletid", JSON.stringify("hiii"));
  }, []);

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={"createAccount"}
            >
              <Stack.Screen name="createAccount" component={CreateAccount} />
              <Stack.Screen name="home" component={Main} />
              <Stack.Screen name="requests" component={Requests} />
              <Stack.Screen name="success" component={Succesfull} />
              <Stack.Screen name="payOnRequest" component={PyaonRequest} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </GestureHandlerRootView>
    </>
  );
}
