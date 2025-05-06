import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClientsOverview from "../../views/Clients/ClientsOverview";
import ClientValueUpdate from "../../views/Clients/ClientValueUpdate";

export default function ClientsRoot({ clientsRender }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Overview"
        component={ClientsOverview}
        initialParams={{ clientsRender }}
      />
      <Stack.Screen name="UpdateClient" component={ClientValueUpdate} />
    </Stack.Navigator>
  );
}
