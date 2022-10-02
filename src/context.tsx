import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { AsyncStorage } from "react-native";
import { useId } from "./hooks/useId";

export interface WalletId {
	id: string;
	identifier: string;
	provider: {
		id: string;
		delimiter: string;
	};
	default: {
		address: string;
		chain: Chain;
	};
	others: {
		address: string;
		chain: Chain[];
	}[];
	currentSignature: string;
	previousSignature: string;
}

export interface GenerateMessageWalletId {
	id: string;
	identifier: string;
	provider: string;
	default: {
		address: string;
		chain: number;
	};
	others: {
		address: string;
		chain: number[];
	}[];
}

export interface Chain {
	id: string;
	name: string;
	chainId: string;
}

interface Wallet {
	address: string;
	privateKey: string;
}

interface AppContext {
	id: WalletId | null;
	setId: Dispatch<SetStateAction<WalletId | null>>;
	evmWallets: Wallet[];
	setEvmWallets: Dispatch<SetStateAction<Wallet[]>>;
	solanaWallets: Wallet[];
	setSolanaWallets: Dispatch<SetStateAction<Wallet[]>>;
	seedPhrase: string;
	setSeedPhrase: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContext>({} as AppContext);

export const useAppContext = () => {
	return useContext(AppContext);
};

interface Props {
	children: ReactNode;
}

export const getIdData = async () => {
	const a: any = await AsyncStorage.getItem("walletid");
	console.log(a, "here we go");
	return JSON.parse(a);
};

export const AppContextProvider = ({ children }: Props) => {
	const [id, setId] = useState<WalletId | null>(null);
	const [evmWallets, setEvmWallets] = useState<Wallet[]>([]);
	const [solanaWallets, setSolanaWallets] = useState<Wallet[]>([]);
	const [seedPhrase, setSeedPhrase] = useState("");

	const { getId } = useId();

	const sharedState = {
		id,
		setId,
		evmWallets,
		setEvmWallets,
		solanaWallets,
		setSolanaWallets,
		seedPhrase,
		setSeedPhrase,
	};

	useEffect(() => {
		console.log(id, "id");
		if (!id) return;
		AsyncStorage.setItem("walletid", JSON.stringify(id));
	}, [id]);

	useEffect(() => {
		(async () => {
			const a: any = await AsyncStorage.getItem("walletid");
			const id = await getId({
				id: JSON.parse(a).id,
			});
			console.log(id, "dsadsadas");
			setId(id);
		})();
	}, []);

	useEffect(() => {
		if (evmWallets && evmWallets.length <= 0) return;
		AsyncStorage.setItem("evmwallets", JSON.stringify(evmWallets));
	}, [evmWallets]);

	useEffect(() => {
		(async () => {
			const a: any = await AsyncStorage.getItem("evmwallets");
			setEvmWallets(JSON.parse(a));
		})();
	}, []);

	useEffect(() => {
		if (seedPhrase) return;
		AsyncStorage.setItem("seedphrase", seedPhrase);
	}, [seedPhrase]);

	useEffect(() => {
		(async () => {
			const a: any = await AsyncStorage.getItem("seedphrase");
			setSeedPhrase(JSON.parse(a));
		})();
	}, []);

	// useEffect(() => {
	// 	if (id == null) return;
	// 	AsyncStorage.setItem("walletid", JSON.stringify(id));
	// }, [id]);

	useEffect(() => {
		(async () => {
			// AsyncStorage.removeItem("walletid");
			// AsyncStorage.removeItem("seedphrase");
			// AsyncStorage.removeItem("evmwallets");
			// console.log("done");
			// console.log(await AsyncStorage.getItem("walletid"), "dsa");
		})();
	});

	return (
		<AppContext.Provider value={sharedState}>
			{children}
		</AppContext.Provider>
	);
};
