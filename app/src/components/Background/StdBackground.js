import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import { styles } from "./style";
import image from "../../../assets/pavao.png";

export function StdBackground({ children }) {
  return (
    <SafeAreaView style={styles.StdBackground}>
      <View style={styles.StdContainer}>{children}</View>
      <Image source={image} style={styles.image} />
    </SafeAreaView>
  );
}
