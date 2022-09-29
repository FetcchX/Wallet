import { Text, View } from "react-native";
import { SIZES } from "../../styles/styles";
import { Asset } from "./Asset";

export const Assets = () => {
  return (
    <>
      <View
        style={{
          marginVertical: SIZES.extralarge,
        }}
      >
        <Text
          style={{
            fontSize: 22,
          }}
        >
          8 Assets
        </Text>
        <Asset />
        <Asset />
        <Asset />
        <Asset />
        <Asset />
      </View>
    </>
  );
};
