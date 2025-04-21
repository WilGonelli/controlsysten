import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RootClients from "./Clients/RootClients";
import RootProducts from "./Products/RootProducts";
import Blank from "./Blank/Blank";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { StdColor } from "../components/style/StdStyle";

export default function TabsRoot() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: StdColor.primaryColor[100],
          tabBarInactiveTintColor: StdColor.secndaryColor[100],
          tabBarStyle: {
            backgroundColor: StdColor.black[80],
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="users" size={24} color={color} />
            ),
          }}
          name="Clientes"
          component={RootClients}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="store" size={24} color={color} />
            ),
          }}
          name="Produtos"
          component={RootProducts}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="slot-machine"
                machinedecks
                size={24}
                color={color}
              />
            ),
          }}
          name="Maquinas"
          component={Blank}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cards-playing"
                machinedecks
                size={24}
                color={color}
              />
            ),
          }}
          name="Caxeta"
          component={Blank}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
