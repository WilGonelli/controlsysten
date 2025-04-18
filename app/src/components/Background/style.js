import { StyleSheet } from "react-native";
import { StdColor } from "../style/StdStyle";

export const styles = StyleSheet.create({
  StdBackground: {
    flex: 1,
    backgroundColor: StdColor.backgroundDefault,
  },
  StdContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
    zIndex: 2,
  },
  image: {
    flex: 1,
    width: 250,
    height: 250,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.3,
  },
});
