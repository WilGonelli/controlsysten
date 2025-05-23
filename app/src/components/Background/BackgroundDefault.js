import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import { styles } from "./style";
import image from "../../../assets/pavao.png";
import CustomHeader from "../CustomHeader/CustomHeader";

export default function BackgroundDefault({ headerProps, children }) {
  return (
    <SafeAreaView style={styles.BackgroundDefault}>
      <CustomHeader {...headerProps} />
      <View style={styles.StdContainer}>{children}</View>
      <Image source={image} style={styles.image} />
    </SafeAreaView>
  );
}
