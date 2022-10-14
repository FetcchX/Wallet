import { useEffect } from "react";
import { View, Image, Text } from "react-native";
import { COLORS } from "../../styles/styles";

export const NFT = ({ image, name }: { image: string; name: string }) => {
  useEffect(() => {
    console.log(image, name);
  }, []);
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
            borderRadius: 12
          }}
          source={{
            uri: image
          }}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <View
          style={{
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            position: "relative",
            bottom: 18,
            paddingVertical: 3,
            backgroundColor: COLORS.primary,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "KronaOne_400Regular",
              color: "white",
              fontSize: 12,
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </>
  );
};
