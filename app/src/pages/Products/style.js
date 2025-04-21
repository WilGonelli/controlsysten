import { StyleSheet } from "react-native";
import { StdColor } from "../../components/style/StdStyle";

export const styles = StyleSheet.create({
  productListOverView: {
    backgroundColor: StdColor.black[60],
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
    color: StdColor.white[100],
    textTransform: "uppercase",
  },
  productTitleSection: {
    height: 30,
    color: StdColor.white[80],
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
});
