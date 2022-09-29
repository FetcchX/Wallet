import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { Text } from "react-native";

interface Props {
  ref: any;
}

export const CustomSheet = ({ ref }: Props) => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      enablePanDownToClose={true}
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <Text>Awesome 🎉</Text>
    </BottomSheet>
  );
};
