import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useChain } from "../../hooks/useChain";
import { ChainAsset } from "./Chain";

interface props {
  active: any;
  chainData: any
}

export const ChainAssets = ({ chainData, active }: props) => {
  console.log(active, "Dsdfff")
  const [chains, setChains] = useState<any[]>(chainData);
  const [activeChains, setActiveChains] = useState<any[]>(active)
  const { getChains } = useChain();

  // useEffect(() => 
  //   (async () => {
  //     const totalChains = await getChains();
  //     console.log("totalChains loaded");
  //     setChains(totalChains);
  //   })();
  // }, [])

  const checkIfChainExist = () => {
    console.log("Running chain active")
    if(active && active.chain) {
      let c = [...chainData]
      console.log(c)

      let filteredC = c.filter(c => active.chain.find((ac: any) => ac.id === c.id))
      filteredC = filteredC.map(fc => {
        return {
          ...fc,
          active: true
        }
      })

      console.log(filteredC, "Dsafedfef")
      c = c.filter((chain: any, idx: number) => filteredC.find(f => f.id !== chain.id));
      
      setChains([...filteredC, ...c])
      // console.log(chainAssetArray, "dsa");
    }
  };

  // useEffect(() => {
  //   checkIfChainExist()
  // }, [chains])
  useFocusEffect(
    useCallback(() => {
      checkIfChainExist();
    }, [])
  )

  return (
    <>
      {chains?.map((asset: any) => {
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
