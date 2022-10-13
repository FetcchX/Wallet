import { ethers } from "ethers";
// import { Keypair } from "@solana/web3.js";
// import * as bip39 from "bip39";
// import { derivePath } from "ed25519-hd-key";
// import bs58 from "bs58";

import { useState } from "react";
import { useAppContext } from "../context";

interface Wallet {
  address: string;
  privateKey: string;
}

export const useWallet = () => {
  const { solanaWallets, setSolanaWallets, evmWallets, setEvmWallets } =
    useAppContext();
  const [seedPhrase, setSeedPhrase] = useState("");

  const generateSeedPhrase = () => {
    const seedPhrase = ethers.Wallet.createRandom();
    console.log(seedPhrase);
    setSeedPhrase(seedPhrase.mnemonic.phrase);
  };

  const generateEvmWallet = (index: number) => {
    console.log("232323");
    // const wallet = ethers.Wallet.fromMnemonic(
    // 	seedPhrase,
    // 	`m/44'/60'/0'/0/${evmWallets.length}`
    // );
    let list: any = [];

    const wallet = ethers.Wallet.createRandom();
    list.push({
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
    if (index > 1) {
      for (let i = 1; i <= index; i++) {
        const newWallet = ethers.Wallet.fromMnemonic(
          wallet.mnemonic.phrase,
          `m/44'/60'/0'/0/${i.toString()}`
        );
        list.push({
          address: newWallet.address,
          privateKey: newWallet.privateKey,
        });
      }
    }
    setSeedPhrase(wallet.mnemonic.phrase);
    console.log("234");
    if (evmWallets && evmWallets.length > 0) {
      console.log("1233");
      setEvmWallets((value) => {
        let shallowCopy = [...value];

        shallowCopy.push(...list);

        return shallowCopy;
      });
    } else {
      console.log("1222");
      setEvmWallets(list);
    }

    console.log(wallet);
  };

  // const generateSolanaWallet = () => {
  // 	if (!seedPhrase) throw "Seed phrase doesn't exist";

  // 	const seed = bip39.mnemonicToSeedSync(seedPhrase, "");

  // 	const path = `m/44'/501'/${solanaWallets.length}'/0'`;
  // 	const wallet = Keypair.fromSeed(
  // 		derivePath(path, seed.toString("hex")).key
  // 	);

  // 	setSolanaWallets((value) => {
  // 		let shallowCopy = [...value];

  // 		shallowCopy.push({
  // 			address: wallet.publicKey.toString(),
  // 			privateKey: bs58.encode(wallet.secretKey),
  // 		});

  // 		return shallowCopy;
  // 	});
  // };

  return {
    seedPhrase,
    generateEvmWallet,
    generateSeedPhrase,
    // generateSolanaWallet,
  };
};
