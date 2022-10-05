import { View, Image, Text } from "react-native";

export const NFT = () => {
  return (
    <>
      <View
        style={{
          marginBottom: 0,
          borderRadius: 12,
          marginHorizontal: 2,
        }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={require("../../../assets/nft04.jpeg")}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <Text
          style={{
            position: "relative",
            bottom: 28,
            fontSize: 18,
            paddingHorizontal: 12,
          }}
        >
          Name
        </Text>
      </View>
    </>
  );
};
