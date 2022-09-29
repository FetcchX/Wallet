import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export const handlonPress = (ref: any) => {
  if (!ref) return;
  (ref as React.MutableRefObject<BottomSheet>).current.expand();
};
