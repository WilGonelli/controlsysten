import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import globalStyle from "../../theme/globalStyle";
import Colors from "../../theme/colors";

export default function CustomButton({ text, backgroundColor, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.containerCustomButton,
        { backgroundColor: backgroundColor },
      ]}
    >
      <Text style={[globalStyle.textItens, { color: Colors.black }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
