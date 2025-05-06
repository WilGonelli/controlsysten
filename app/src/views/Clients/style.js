import { StyleSheet } from "react-native";
import Colors from "./../../theme/colors";
import Metrics from "./../../theme/metrics";
import Fonts from "./../../theme/fonts";

export const styles = StyleSheet.create({
  //modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContainer: {
    width: "80%",
    padding: Metrics.padding.medium,
    backgroundColor: Colors.white,
    borderRadius: Metrics.borderRadius.medium,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    color: Colors.black,
    fontSize: 22,
  },
  //Clients overview styles
  clientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.beige,
    marginTop: Metrics.margin.large,
    paddingHorizontal: Metrics.padding.medium,
    borderRadius: Metrics.borderRadius.large,
  },
  //Client update value styles
  labelInputUpdateClient: {
    color: Colors.gray,
    fontSize: Fonts.fontSize.subTitle,
    fontWeight: "bold",
    width: "50%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  cifraoInput: {
    position: "absolute",
    color: Colors.black,
    fontSize: Fonts.fontSize.subTitle,
    left: "55%",
    top: 8,
    zIndex: 200,
  },
  inputUpdateClient: {
    backgroundColor: Colors.white,
    width: "50%",
    borderRadius: Metrics.borderRadius.medium,
    color: Colors.black,
    fontSize: Fonts.fontSize.subTitle,
    fontWeight: "bold",
    paddingLeft: 55,
    zIndex: 10,
  },
  transitionsHistoryClient: {
    flex: 1,
    width: "100%",
    borderRadius: 18,
    marginTop: 28,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  TotalTransitions: {
    paddingHorizontal: 24,
    borderTopWidth: 2,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeIcon: {
    fontSize: 38,
    position: "absolute",
    right: 8,
    top: 2,
    color: Colors.gray,
    zIndex: 20,
  },
});
