import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientsOverview from "./ClientsOverview";
import AddClient from "./AddClient";

export default function RootClients() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={ClientsOverview} />
      <Stack.Screen name="AddClient" component={AddClient} />
    </Stack.Navigator>
  );
}
