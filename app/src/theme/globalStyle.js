import { StyleSheet } from "react-native";

import Colors from "./colors";
import Fonts from "./fonts";
import Metrics from "./metrics";

const globalStyle = StyleSheet.create({
  title: {
    fontSize: Fonts.fontSize.title,
    textAlign: "center",
    marginTop: Metrics.margin.small,
    color: Colors.white,
    fontWeight: Fonts.fontWeight.bold,
    width: "100%",
  },
  subTitle: {
    fontSize: Fonts.fontSize.subTitle,
    color: Colors.white,
    fontWeight: Fonts.fontWeight.medium,
    minWidth: "50%",
    paddingHorizontal: Metrics.padding.medium,
  },
  textItens: {
    height: 30,
    color: Colors.white,
    fontSize: Fonts.fontSize.text,
  },
  textCustomButton: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
  },
  containerSubTitle: {
    marginTop: Metrics.margin.medium,
    flexDirection: "row",
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  containerItens: {
    flexDirection: "row",
    borderBottomWidth: 1,
    marginHorizontal: Metrics.margin.medium,
    marginTop: Metrics.margin.small,
    justifyContent: "space-between",
  },
});

export default globalStyle;
