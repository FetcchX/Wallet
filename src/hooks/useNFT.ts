import axios from "axios";
import { useId } from "./useId";

const regex = /\${[^{]+}/g;

// get the specified property or nested property of an object
function getObjPath(path: string, obj: any, fallback = "") {
  return path.split(".").reduce((res, key) => res[key] || fallback, obj);
}

export function interpolate(template: string, variables: any, fallback?: any) {
  return template.replace(regex, (match) => {
    const path = match.slice(2, -1).trim();
    return getObjPath(path, variables, fallback);
  });
}

const urls: any = {
  "1": "https://eth-mainnet.g.alchemy.com/nft/v2",
  "2": "https://polygon-mainnet.g.alchemy.com/nft/v2",
};

const ALCHMEY_API_KEY = "y141okG6TC3PecBM1mL0BfST9f4WQmLx";

export const getNFT = async (address: string, chain: string) => {
  console.log(address, chain);
  try {
    const url = urls[chain];

    const res = await axios({
      method: "GET",
      url: `${url}/${ALCHMEY_API_KEY}/getNFTs`,
      params: {
        owner: address,
        withMetadata: true,
        pageSize: 8
      },
    });

    const data = res.data;

    // console.log(data, "dsa");

    return data;
  } catch (e) {
    console.log(JSON.stringify(e));
  }
};

export const useNFTs = () => {
  const { getId } = useId();

  const getIdNFTs = async (id: string) => {
    const walletId = await getId({
      id: id,
    });

    const nfts: any[] = [];

    const defaultNFTs: any = await getNFT(
      "0x9c748a6b2fD26757f6D15b82f4bF7F7aEF66F4Bb",
      "1"
    );

    nfts.push(defaultNFTs.ownedNfts);

    for (let i = 0; i < walletId.others.length; i++) {
      const address = walletId.others[i].address;

      for (let j = 0; j < walletId.others[i].chain.length; j++) {
        const chain = walletId.others[i].chain[j];

        const nft: any = getNFT(address, chain);

        nfts.push(nft.ownedNfts);
      }
    }

    return nfts.flat();
  };

  return {
    getIdNFTs,
  };
};
