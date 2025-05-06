import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";

export const styles = StyleSheet.create({
  BackgroundDefault: {
    flex: 1,
    backgroundColor: Colors.backgroundDefault,
    position: "relative",
  },
  StdContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 20,
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
