import { StyleSheet } from "react-native";

import Colors from "./colors";
import Fonts from "./fonts";
import Metrics from "./metrics";

const globalStyle = StyleSheet.create({
  title: {
    fontSize: Fonts.fontSize.title,
    textAlign: "center",
    color: Colors.white,
    fontWeight: Fonts.fontWeight.bold,
    width: "100%",
    textAlignVertical: "auto",
  },
  subTitle: {
    fontSize: Fonts.fontSize.subTitle,
    color: Colors.white,
    fontWeight: Fonts.fontWeight.medium,
    minWidth: "50%",
    paddingHorizontal: Metrics.padding.small,
    textAlignVertical: "center",
  },
  textItens: {
    color: Colors.white,
    fontSize: Fonts.fontSize.text,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  textCustomButton: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.black,
    textAlignVertical: "center",
    textTransform: "uppercase",
    flexWrap: "wrap",
  },
  containerSubTitle: {
    position: "relative",
    marginTop: Metrics.margin.medium,
    flexDirection: "row",
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  containerItens: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: Metrics.padding.small,
    marginHorizontal: Metrics.margin.medium,
    justifyContent: "space-between",
    height: "100%",
  },
  icon: {
    color: Colors.secundaryColor[20],
    fontSize: 32,
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
    height: 50,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    color: Colors.black,
    fontSize: 22,
    paddingHorizontal: Metrics.padding.small,
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default globalStyle;
