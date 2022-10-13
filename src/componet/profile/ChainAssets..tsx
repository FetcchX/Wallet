import { useEffect, useState } from "react";
import { useChain } from "../../hooks/useChain";
import { ChainAsset } from "./Chain";

interface props {
  active: any;
}

export const ChainAssets = ({ active }: props) => {
  const [chains, setChains] = useState<any[]>([]);
  const { getChains } = useChain();
  const [chainAssetArray, setchainAssetArray] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const totalChains = await getChains();
      console.log(totalChains, "Dsafds");
      setChains(totalChains);
    })();
  }, []);

  const checkIfChainExist = () => {
    chains.map((chain: any) => {
      active?.chain.map((activeChain: any) => {
        if (chain.id == activeChain.id) {
          chainAssetArray.unshift({
            name: chain.name,
            id: chain.id,
            active: true,
            icon: chain.icon,
          });
        } else {
          chainAssetArray.push({
            name: chain.name,
            id: chain.id,
            active: false,
            icon: chain.icon,
          });
        }
      });
    });
    console.log(chainAssetArray);
  };

  useEffect(() => {
    checkIfChainExist();
  }, []);

  return (
    <>
      {chainAssetArray?.map((asset: any) => {
        return (
          <ChainAsset
            key={asset.id}
            chainId={asset.id}
            name={asset.name}
            icon={asset.icon}
            active={asset.active}
          />
        );
      })}
    </>
  );
};
