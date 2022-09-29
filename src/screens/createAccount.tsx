import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native";
import { size } from "superstruct";
import { COLORS, SIZES } from "../styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CreateAccount = ({ navigation }: any) => {
  return (
    <View style={style.container}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: SIZES.extralarge,
        }}
      >
        <Text style={style.headerText}>Create Account</Text>
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              fontWeight: "bold",
              marginBottom: SIZES.small,
            }}
          >
            username
          </Text>
          <TextInput
            placeholder="kid@fetcch"
            style={{
              borderRadius: 14,
              borderColor: "#000",
              borderWidth: 1,
              padding: 8,
            }}
          />
          <Text
            style={{
              fontSize: SIZES.xsmall,
            }}
          >
            *you cannot change your username later
          </Text>
        </View>
      </View>
      <View style={style.bottom}>
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: SIZES.extralarge,
            }}
          >
            select chain (s)
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: SIZES.small,
            }}
          >
            Select chains for whom you want to create
          </Text>
          <View>
            <TouchableOpacity style={style.circle}>
              <Text
                style={{
                  fontSize: SIZES.extralarge,
                }}
              >
                S
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.button}>
            <Text
              style={{
                fontSize: SIZES.extralarge,
              }}
            >
              Select Chains
            </Text>
            <Ionicons name="md-arrow-forward-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("home");
            }}
            style={style.next}
          >
            <Text
              style={{
                fontSize: SIZES.extralarge,
                textAlign: "center",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
  },
  headerText: {
    padding: SIZES.extralarge,
    fontSize: SIZES.extralarge,
    textAlign: "center",
    fontWeight: "bold",
  },
  bottom: {
    backgroundColor: COLORS.primary,
    padding: SIZES.extralarge,
    borderRadius: 23,
    justifyContent: "space-between",
    height: "50%",
  },
  button: {
    flexDirection: "row",
    marginVertical: SIZES.xsmall,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    padding: SIZES.small,
  },
  next: {
    backgroundColor: "#FFFFFF",
    padding: SIZES.small,
    borderRadius: 100,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: SIZES.small,
  },
});
