import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "./style";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
    </View>
  );
}
