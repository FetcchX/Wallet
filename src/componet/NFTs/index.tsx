import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useAppContext } from "../../context";
import { getNFT } from "../../hooks/useNFT";
import { COLORS } from "../../styles/styles";
import { NFT } from "./NFT";

export const NFTs = () => {
  // const { nfts } = useAppContext();
  const [nfts, setNfts] = useState<any>([]);
  const get = async () => {
    const data = await getNFT(
      "0x9c748a6b2fD26757f6D15b82f4bF7F7aEF66F4Bb",
      "1"
    );
    console.log(data, "dsadsdfd");
    setNfts(data.ownedNfts);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    console.log(nfts.length, "Dsa");
  }, [nfts]);

  return (
    <>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          {nfts ? (
            nfts.length > 0 &&
            nfts.map((nft: any) => {
              return (
                <NFT
                  image={nft.metadata.image}
                  name={
                    nft.metadata.name &&
                    `${nft.metadata.name.substring(0, 5)}...`
                  }
                />
              );
            })
          ) : (
            <ActivityIndicator size={30} color={COLORS.primary} />
          )}
        </View>
      </ScrollView>
    </>
  );
};
