import { ScrollView, Text, View } from "react-native";
import { Request } from "../componet/request";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";

export const Requests = ({ navigation }: any) => {
  return (
    <ScrollView>
      <Safe>
        <Header />
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            marginBottom: 22,
          }}
        >
          Payment Requests
        </Text>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Request navigation={navigation} />
        </View>
      </Safe>
    </ScrollView>
  );
};
