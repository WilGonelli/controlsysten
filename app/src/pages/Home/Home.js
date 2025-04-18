import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import clientsList from "../../mocks/clientsMocked.json";
import { StdBackground } from "../../components/Background/StdBackground";

export default function Home() {
  return (
    <StdBackground>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
    </StdBackground>
  );
}
