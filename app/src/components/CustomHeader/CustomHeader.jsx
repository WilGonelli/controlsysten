import React from "react";
import { Text, View } from "react-native";
import globalStyle from "../../theme/globalStyle";

export default function CustomHeader({
  title,
  complement,
  leftComponent,
  rightComponent,
}) {
  return (
    <View style={globalStyle.headerContainer}>
      <View style={globalStyle.headerRow}>
        {leftComponent && <View>{leftComponent}</View>}
        {title && <Text style={globalStyle.title}>{title}</Text>}
        {rightComponent && <View>{rightComponent}</View>}
      </View>
      {complement && (
        <Text style={[globalStyle.title, { fontSize: 24 }]}>
          {complement.toUpperCase()}
        </Text>
      )}
    </View>
  );
}
