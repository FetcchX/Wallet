import { Image, StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../styles/styles";

export const Chain = ({
  name,
  chainId,
  image
}: {
  name: string;
  image: string
  chainId: any
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#EAFDE0",
        marginVertical: 8,
      }}
    >
      <View style={AssetStyle.container}>
        <View style={AssetStyle.left}>
          <View>
            <Text style={AssetStyle.token}>{name}</Text>
            <Text
              style={{
                fontSize: 8,
                fontFamily: "KronaOne_400Regular",
              }}
            >
              {chainId}
            </Text>
          </View>
        </View>
        <View>
        <Image
            source={{
                uri: image,
            }}
            style={{
                width: 32,
                height: 32,
            }}
            />
        </View>
      </View>
    </View>
  );
};

const AssetStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "KronaOne_400Regular",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontFamily: "KronaOne_400Regular",
  },
  token: {
    fontSize: SIZES.large,
    fontFamily: "KronaOne_400Regular",
  },
});
