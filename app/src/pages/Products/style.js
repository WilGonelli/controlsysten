import { StyleSheet } from "react-native";
import { StdColor } from "../../components/style/StdStyle";

export const styles = StyleSheet.create({
  productTitle: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 8,
    color: StdColor.white[80],
    fontWeight: "bold",
  },
  productListOverView: {
    backgroundColor: StdColor.white[20],
    flex: 1,
    borderRadius: 12,
    marginTop: 16,
  },
  productListDescriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 2,
  },
  productListDescription: {
    height: 40,
    color: StdColor.black[80],
    fontSize: 30,
  },
  productItemContainer: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    marginHorizontal: 16,
    marginTop: 6,
    justifyContent: "space-between",
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
});
