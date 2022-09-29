import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useWallet } from "./src/hooks/useWallet";

export default function App() {
	const {
		seedPhrase,
		evmWallets,
		solanaWallets,
		generateEvmWallet,
		generateSeedPhrase,
		generateSolanaWallet,
	} = useWallet();

	useEffect(() => {
		if (seedPhrase) generateEvmWallet();
		if (seedPhrase) generateSolanaWallet();
	}, [seedPhrase]);

	useEffect(() => {
		console.log(evmWallets);
	}, [evmWallets]);

	useEffect(() => console.log(solanaWallets), [solanaWallets]);

	useEffect(() => {
		generateSeedPhrase();
	}, []);

	return (
		<View className="flex-1 items-center justify-center">
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
}
