import { StyleSheet } from "react-native";
import Colors from "./../../theme/colors";
import Metrics from "./../../theme/metrics";
import Fonts from "./../../theme/fonts";

export const styles = StyleSheet.create({
  productListOverView: {
    backgroundColor: Colors.black,
    flex: 1,
    borderRadius: 12,
    marginTop: 16,
  },
  productItemLabel: {
    fontSize: 24,
    paddingHorizontal: 8,
    textWarp: "warp",
    textAlign: "justify",
    textAlignVertical: "center",
    maxWidth: "70%",
  },
  productBtnContainer: {
    flexDirection: "row",
    height: 70,
    marginTop: 16,
    justifyContent: "space-around",
    alignItems: "center",
  },
  productBtnBuy: {
    backgroundColor: "#006400",
    width: "45%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  productBtnSale: {
    backgroundColor: "#8B0000",
    width: "45%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  productBtnLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    textTransform: "uppercase",
  },
  productTitleSection: {
    height: 30,
    color: Colors.white,
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },

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
  clientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.beige,
    marginTop: Metrics.margin.medium,
    paddingHorizontal: Metrics.padding.medium,
    borderRadius: Metrics.borderRadius.medium,
  },
  labelInputUpdateClient: {
    color: Colors.gray,
    fontSize: Fonts.fontSize.subTitle,
    fontWeight: "bold",
    width: "50%",
    textAlign: "center",
    textAlignVertical: "center",
    minHeight: "fix-content",
  },
  inputUpdateClient: {
    backgroundColor: Colors.white,
    width: "50%",
    borderRadius: Metrics.borderRadius.medium,
    color: Colors.black,
    fontSize: Fonts.fontSize.subTitle,
    fontWeight: "bold",
  },
  transitionsHistoryClient: {
    flex: 1,
    width: "100%",
    borderRadius: 18,
    marginTop: 28,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.5)",
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
