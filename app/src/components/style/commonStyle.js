import { StyleSheet } from "react-native";
import { StdColor } from "../../components/style/StdStyle";

export const commonStyles = StyleSheet.create({
  commomTextTitle: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 12,
    color: StdColor.white[80],
    fontWeight: "bold",
    width: "100%",
  },
  commonContainerLabel: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    borderBottomColor: StdColor.white[100],
    height: 50,
    borderBottomWidth: 2,
  },
  commonDescriptionsText: {
    height: 30,
    color: StdColor.white[80],
    fontSize: 24,
  },
  commonContainerItens: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    marginHorizontal: 16,
    marginTop: 6,
    justifyContent: "space-between",
  },
  commonFontSizeLabel: {
    fontSize: 18,
  },
  commonBtnLarge: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  commonBtnText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  commonInputText: {
    width: "100%",
    backgroundColor: StdColor.white[20],
    borderRadius: 16,
    paddingLeft: 16,
    marginTop: 12,
    color: StdColor.black[80],
    fontSize: 22,
    fontWeight: "bold",
  },
  commonLabelSelectContainer: {
    fontSize: 18,
    fontWeight: "bold",
    color: StdColor.black[100],
  },
});
