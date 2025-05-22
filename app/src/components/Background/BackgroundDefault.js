import React from "react";
import { ScrollView, SafeAreaView, Image } from "react-native";
import { styles } from "./style";
import image from "../../../assets/pavao.png";

export default function BackgroundDefault({ children }) {
  return (
    <SafeAreaView style={styles.BackgroundDefault}>
      <ScrollView style={styles.StdContainer}>{children}</ScrollView>
      <Image source={image} style={styles.image} />
    </SafeAreaView>
  );
}
