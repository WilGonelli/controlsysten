import { StyleSheet } from "react-native";
import { StdColor } from "../../components/style/StdStyle";

export const styles = StyleSheet.create({
  iconPlusClient: {
    color: StdColor.secndaryColor[40],
    fontSize: 28,
    position: "absolute",
    right: 8,
    top: 18,
    width: 50,
    height: 50,
  },
  clientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    backgroundColor: StdColor.white[20],
    marginTop: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  clientContainerDebt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: 50,
    paddingLeft: 32,
  },

  containerInputUpdateClient: {
    flexDirection: "row",
    width: "100%",
    marginTop: 16,
    justifyContent: "space-around",
    height: 50,
  },
  labelInputUpdateClient: {
    color: StdColor.white[20],
    fontSize: 28,
    fontWeight: "bold",
    width: "50%",
    textAlign: "center",
  },
  cifraoInput: {
    position: "absolute",
    color: StdColor.black[80],
    fontSize: 28,
    left: "50%",
    top: 5,
    zIndex: 3,
  },
  inputUpdateClient: {
    backgroundColor: StdColor.white[60],
    width: "50%",
    borderRadius: 12,
    color: StdColor.black[80],
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 50,
  },
  transitionsHistoryClient: {
    flex: 1,
    backgroundColor: StdColor.white[40],
    width: "100%",
    borderRadius: 18,
    marginTop: 28,
    overflow: "hidden",
  },
  labelHistoryTransitions: {
    fontSize: 20,
    textAlign: "center",
    borderBottomWidth: 2,
  },

  TotalTransitions: {
    paddingHorizontal: 24,
    borderTopWidth: 2,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
