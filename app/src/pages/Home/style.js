import { StyleSheet } from "react-native";
import { StdColor } from "../../components/style/StdStyle";

export const styles = StyleSheet.create({
  containerClients: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItens: "center",
    height: 60,
    marginTop: 12,
  },
  titleScreen: {
    color: StdColor.white[80],
    fontSize: 42,
    width: "100%",
    textAlign: "center",
  },
  iconPlusClient: {
    color: StdColor.secndaryColor[40],
    fontSize: 28,
    position: "absolute",
    right: 8,
    top: 16,
  },
  containerDescriptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 50,
    borderBottomColor: StdColor.white[80],
    borderBottomWidth: 1,
  },
  descriptionsText: {
    height: 30,
    color: StdColor.white[80],
    fontSize: 24,
    width: "30%",
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
  clientInfo: {
    color: StdColor.black[80],
    fontSize: 22,
    fontWeight: "bold",
    justifyContent: "space-between",
  },
  clientContainerDebt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: 50,
    paddingLeft: 32,
  },
});
