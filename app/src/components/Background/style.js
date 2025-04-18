import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  StdBackground: {
    flex: 1,
    backgroundColor: "#0B192C",
  },
  StdContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
