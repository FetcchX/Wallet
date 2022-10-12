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
import { Send } from "./src/screens/send";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Transections } from "./src/screens/Transections";
import { Profile } from "./src/screens/Profile";
import { COLORS } from "./src/styles/styles";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Pfp"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          padding: 12,
          position: "absolute",
          bottom: 20,
          zIndex: 20,
          marginHorizontal: 20,
          borderRadius: 100,
        },
        tabBarLabelStyle: {
          color: COLORS.secondary,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons name="home" color={"#fff"} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Txs"
        component={Transections}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <AntDesign
              name="swap"
              color={"#fff"}
              size={20}
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pfp"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons name="account-circle" color={"#fff"} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    KronaOne_400Regular,
  });

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
              initialRouteName={"home"}
            >
              <Stack.Screen name="TabNavigation" component={TabNavigation} />
              <Stack.Screen name="Txs" component={Transections} />
              <Stack.Screen name="Pfp" component={Profile} />
              <Stack.Screen name="createAccount" component={CreateAccount} />
              <Stack.Screen name="home" component={Main} />
              <Stack.Screen name="requests" component={Requests} />
              <Stack.Screen name="success" component={Succesfull} />
              <Stack.Screen name="payOnRequest" component={PyaonRequest} />
              <Stack.Screen name="send" component={Send} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </GestureHandlerRootView>
    </>
  );
}
