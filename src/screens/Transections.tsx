import { Text, View } from "react-native";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import { Transection } from "../componet/Transection.tsx";

export const Transections = () => {
  return (
    <>
      <Safe>
        <Header />
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            marginBottom: 12,
            marginTop: -20,
          }}
        >
          Transections
        </Text>
        <Transection
          address="0xkljwewoi"
          ammount={12}
          date="12/12/12"
          hash="0xljowiejiow"
        />
        <Transection
          address="0xkljwewoi"
          ammount={12}
          date="12/12/12"
          hash="0xljowiejiow"
        />
        <Transection
          address="0xkljwewoi"
          ammount={12}
          date="12/12/12"
          hash="0xljowiejiow"
        />
      </Safe>
    </>
  );
};
