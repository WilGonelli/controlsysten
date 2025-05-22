import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";

export const styles = StyleSheet.create({
  BackgroundDefault: {
    height: "100%",
    backgroundColor: Colors.backgroundDefault,
    position: "relative",
    paddingBottom: 20,
  },
  StdContainer: {
    height: "100%",
    paddingHorizontal: 12,
    zIndex: 1,
  },
  image: {
    width: 250,
    height: 250,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 0,
    opacity: 0.4,
  },
});
