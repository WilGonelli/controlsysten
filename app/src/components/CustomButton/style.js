import { StyleSheet } from "react-native";

import Colors from "../../theme/colors";
import Fonts from "../../theme/fonts";
import Metrics from "../../theme/metrics";

const styles = StyleSheet.create({
  containerCustomButton: {
    width: "100%",
    height: 50,
    borderRadius: Metrics.borderRadius.medium,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.margin.medium,
  },
});

export default styles;
