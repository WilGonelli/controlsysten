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
    textAlignVertical: "center",
  },
  subTitle: {
    fontSize: Fonts.fontSize.subTitle,
    color: Colors.white,
    fontWeight: Fonts.fontWeight.medium,
    minWidth: "50%",
    paddingHorizontal: Metrics.padding.medium,
    textAlignVertical: "center",
  },
  textItens: {
    height: 30,
    color: Colors.white,
    fontSize: Fonts.fontSize.text,
    textAlignVertical: "center",
  },
  textCustomButton: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
    textAlignVertical: "center",
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
    marginHorizontal: Metrics.margin.medium,
    marginTop: Metrics.margin.small,
    justifyContent: "space-between",
  },
  icon: {
    color: Colors.secundaryColor[20],
    fontSize: 36,
    position: "absolute",
    right: 0,
    top: 18,
    width: 50,
    height: 50,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    color: Colors.black,
    fontSize: 22,
    paddingHorizontal: Metrics.padding.medium,
  },
});

export default globalStyle;
