import { ReactNode } from "react";
import { SafeAreaView } from "react-native";

interface Props {
  children: ReactNode;
}

export const Safe = ({ children }: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 12,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
