import { View } from "react-native";
import { Request } from "../componet/request";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";

export const Requests = () => {
  return (
    <Safe>
      <Header />
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Request />
        <Request />
        <Request />
        <Request />
        <Request />
      </View>
    </Safe>
  );
};
